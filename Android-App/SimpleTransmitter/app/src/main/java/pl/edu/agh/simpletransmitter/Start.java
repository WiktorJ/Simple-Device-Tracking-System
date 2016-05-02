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
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class Start extends AppCompatActivity {

    private boolean isTransmissionActive = false;
    private String lat="", lon="";
    private LocationManager locationManager;
    private LocationListener locationListener;
    private TextView tv;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);
        this.locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        this.tv = (TextView) findViewById(R.id.txtAddress);
        this.locationListener = new LocationListener() {
            public void onLocationChanged(Location location) {
                // Called when a new location is found by the network location provider.
                lat = Double.toString(location.getLatitude());
                lon = Double.toString(location.getLongitude());
                //TODO: Send it to server
                tv.setText("Your Location is:" + lat + "--" + lon);
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
