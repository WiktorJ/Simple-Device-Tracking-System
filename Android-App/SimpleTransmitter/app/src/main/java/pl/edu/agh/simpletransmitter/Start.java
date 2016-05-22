package pl.edu.agh.simpletransmitter;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.java_websocket.client.WebSocketClient;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class Start extends AppCompatActivity {

    //TODO: This should be in properties
    private static final MediaType JSON
            = MediaType.parse("application/json; charset=utf-8");
    private static final String SERVER_ADDRESS = "http://httpbin.org/post";
    private static final String WEBSOCKET_SERVER_ADDRESS = "ws://devices-tracking-server.herokuapp.com/location";
//    private static final String WEBSOCKET_SERVER_ADDRESS = "ws://localhost:5000/location";


    private boolean isTransmissionActive = false;
    private LocationManager locationManager;
    private LocationListener locationListener;
    //This field is just for development process simplification, it will be remove before finall version
    private TextView tv;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);
        this.locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        this.tv = (TextView) findViewById(R.id.txtAddress);
        URI uri;
        try {
            uri = new URI(WEBSOCKET_SERVER_ADDRESS);
        } catch (URISyntaxException e) {
            Log.d("Start", "URI creating error", e);
            return;
        }
        final LocationWebSocketClient locationWebSocketClient = new LocationWebSocketClient(uri, locationManager, this);
        locationWebSocketClient.connect();

        //TODO: This code of location listener is very long. Moving it to separate class should be considerate.
        this.locationListener = new LocationListener() {
            public void onLocationChanged(Location location) {
                // Called when a new location is found by the network location provider.
                try {
                    tv.setVisibility(View.VISIBLE);
                    JSONObject jsonObject = Utils.buildLocationJSON(location, false);
                    locationWebSocketClient.send(jsonObject.toString());
//                    RequestBody body = RequestBody.create(JSON, jsonObject.toString());
//                    Request request = new Request.Builder()
//                            .url(SERVER_ADDRESS)
//                            .post(body)
//                            .build();
//                    client.newCall(request).enqueue(new Callback() {
//                        @Override
//                        public void onFailure(Call call, IOException e) {
//                            FIXME: This logger don't seen to work
//                            TODO: There should be some prompt if request fails
//                            Log.d("Start", "Response Failure", e);
//                        }
//
//                        @Override
//                        public void onResponse(Call call, final Response response) throws IOException {
//                            In Final version there shouldn't be any message about success
//                            So this code here is unnecessary
//                            runOnUiThread(new Runnable() {
//                                @Override
//                                public void run() {
//                                    tv.setText(response.message());
//                                    tv.postDelayed(new Runnable() {
//                                        @Override
//                                        public void run() {
//                                            tv.setVisibility(View.INVISIBLE);
//                                        }
//                                    }, 3000);
//                                }
//                            });
//                        }
//                    });

                } catch (JSONException e) {
                    //FIXME: Same as above
                    Log.d("Start", "Error in Listner", e);
                    e.printStackTrace();
                }
            }

            public void onStatusChanged(String provider, int status, Bundle extras) {}

            public void onProviderEnabled(String provider) {}

            public void onProviderDisabled(String provider) {}
        };
    }

    public void startStopOnClick(View v) {
        if (!isTransmissionActive) {
            v.setBackgroundColor(getResources().getColor(R.color.stop_tracking_color));
            ((Button) v).setText(R.string.stop_text);

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

        } else {
            v.setBackgroundColor(getResources().getColor(R.color.start_tracking_color));
            ((Button) v).setText(R.string.start_text);
            locationManager.removeUpdates(locationListener);
        }
        isTransmissionActive = !isTransmissionActive;
    }

    public void logoutOnClick(View v) {
        if(isTransmissionActive) {
            startStopOnClick(findViewById(R.id.start_stop_button));
        }
        //TODO: perform logout
        finish();
    }

}
