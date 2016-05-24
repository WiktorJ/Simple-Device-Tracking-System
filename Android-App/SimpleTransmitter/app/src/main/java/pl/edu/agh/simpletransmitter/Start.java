package pl.edu.agh.simpletransmitter;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.Uri;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.google.android.gms.appindexing.Action;
import com.google.android.gms.appindexing.AppIndex;
import com.google.android.gms.common.api.GoogleApiClient;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

//TODO: Handle situation when there is no internet or gps connection (probably some popup to user)
public class Start extends AppCompatActivity {

    //TODO: This should be in properties
    private static final long initialDelay = 0;
    private static final long period = 2000;
    private static final TimeUnit unit = TimeUnit.MILLISECONDS;
    private static final String WEBSOCKET_SERVER_ADDRESS = "ws://devices-tracking-server.herokuapp.com/location";
    private static URI uri;
    //    private static final String WEBSOCKET_SERVER_ADDRESS = "ws://localhost:5000/location";

    private boolean isTransmissionActive = false;
    private LocationManager locationManager;
    private LocationListener locationListener;
    private LocationWebSocketClient locationWebSocketClient;
    private ScheduledExecutorService keepAliveScheduler = Executors.newSingleThreadScheduledExecutor();
    private ScheduledFuture<?> keepAliveTask;
    //This field is just for development process simplification, it will be remove before finall version
    private TextView tv;
    /**
     * ATTENTION: This was auto-generated to implement the App Indexing API.
     * See https://g.co/AppIndexing/AndroidStudio for more information.
     */
    private GoogleApiClient client;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);
        this.locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        this.tv = (TextView) findViewById(R.id.txtAddress);
        try {
            uri = new URI(WEBSOCKET_SERVER_ADDRESS);
        } catch (URISyntaxException e) {
            Log.d("Start", "URI creating error", e);
            return;
        }

        //TODO: This code of location listener is very long. Moving it to separate class should be considerate.
        this.locationListener = new LocationListener() {
            public void onLocationChanged(Location location) {
                // Called when a new location is found by the network location provider.
                try {
                    tv.setVisibility(View.VISIBLE);
                    JSONObject jsonObject = Utils.buildLocationJSON(location, false);
                    //TODO: Handle sending failure
                    locationWebSocketClient.send(jsonObject.toString());

                } catch (JSONException e) {
                    Log.d("Start", "Error in Listner", e);
                }
            }

            public void onStatusChanged(String provider, int status, Bundle extras) {
            }

            public void onProviderEnabled(String provider) {
            }

            public void onProviderDisabled(String provider) {
            }
        };
        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        client = new GoogleApiClient.Builder(this).addApi(AppIndex.API).build();
    }

    public void startStopOnClick(View v) {
        if (!isTransmissionActive) {
            v.setBackgroundColor(getResources().getColor(R.color.stop_tracking_color));
            ((Button) v).setText(R.string.stop_text);
            locationWebSocketClient = new LocationWebSocketClient(uri, locationManager, this);
            try {
                locationWebSocketClient.connectBlocking();
            } catch (InterruptedException e) {
                Log.e("Start", "error during connection", e);
                return;
            }
            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                // here to request the missing permissions, and then overriding
                //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                //                                          int[] grantResults)
                // to handle the case where the user grants the permission. See the documentation
                // for ActivityCompat#requestPermissions for more details.
                System.err.println("PERMISSION NOT GRANTED!");
                return;
            }
            // Register the listener with the Location Manager to receive location updates
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, locationListener);
            keepAliveTask = keepAliveScheduler.scheduleAtFixedRate(new Runnable() {
                @Override
                public void run() {
                        try {
                            locationWebSocketClient.send(Utils.buildKeepAliveJSON().toString());
                            Log.i("Start", "KeepAlive sent");
                        } catch (JSONException e) {
                            Log.e("Start", "Error in keepAlive sending thread", e);
                        }
                    }
            }, initialDelay, period, unit);

        } else {
            v.setBackgroundColor(getResources().getColor(R.color.start_tracking_color));
            ((Button) v).setText(R.string.start_text);
            locationManager.removeUpdates(locationListener);
            keepAliveTask.cancel(true);
            try {
                locationWebSocketClient.send(Utils.buildLocationJSON(locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER), true).toString());
            } catch (JSONException e) {
                Log.d("Start", "Error while sending stop message", e);
            }
            locationWebSocketClient.close();
        }
        isTransmissionActive = !isTransmissionActive;
    }

    public void logoutOnClick(View v) {
        if (isTransmissionActive) {
            startStopOnClick(findViewById(R.id.start_stop_button));
        }
        //TODO: perform logout
        finish();
    }

    @Override
    public void onStart() {
        super.onStart();

        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        client.connect();
        Action viewAction = Action.newAction(
                Action.TYPE_VIEW, // TODO: choose an action type.
                "Start Page", // TODO: Define a title for the content shown.
                // TODO: If you have web page content that matches this app activity's content,
                // make sure this auto-generated web page URL is correct.
                // Otherwise, set the URL to null.
                Uri.parse("http://host/path"),
                // TODO: Make sure this auto-generated app URL is correct.
                Uri.parse("android-app://pl.edu.agh.simpletransmitter/http/host/path")
        );
        AppIndex.AppIndexApi.start(client, viewAction);
    }

    @Override
    public void onStop() {
        super.onStop();

        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        Action viewAction = Action.newAction(
                Action.TYPE_VIEW, // TODO: choose an action type.
                "Start Page", // TODO: Define a title for the content shown.
                // TODO: If you have web page content that matches this app activity's content,
                // make sure this auto-generated web page URL is correct.
                // Otherwise, set the URL to null.
                Uri.parse("http://host/path"),
                // TODO: Make sure this auto-generated app URL is correct.
                Uri.parse("android-app://pl.edu.agh.simpletransmitter/http/host/path")
        );
        AppIndex.AppIndexApi.end(client, viewAction);
        client.disconnect();
    }
}
