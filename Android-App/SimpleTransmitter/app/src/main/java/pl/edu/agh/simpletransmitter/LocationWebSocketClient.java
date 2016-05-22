package pl.edu.agh.simpletransmitter;

import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.support.v4.app.ActivityCompat;
import android.util.Log;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.drafts.Draft;
import org.java_websocket.handshake.ServerHandshake;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URI;
import java.util.Map;

/**
 * Created by wiktor on 22/05/16.
 */
public class LocationWebSocketClient extends WebSocketClient {

    private final URI serverURI;
    private final LocationManager locationManager;
    private final Start start;

    public LocationWebSocketClient(URI serverURI, LocationManager locationManager, Start start) {
        super(serverURI);
        this.serverURI = serverURI;
        this.locationManager = locationManager;
        this.start = start;
    }


    @Override
    public void onOpen(ServerHandshake serverHandshake) {
        Log.d("Websocket", "onOpen " + serverHandshake.getHttpStatusMessage());
        if (ActivityCompat.checkSelfPermission(start, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(start, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        Location lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
        try {
            JSONObject jsonObject = Utils.buildLocationJSON(lastKnownLocation, false);
            super.send(jsonObject.toString());
        } catch (JSONException e) {
            Log.e("Websocket", "Error in onOpen", e);
        }
    }

    @Override
    public void onMessage(String s) {
        Log.d("Websocket", "onMessage " + s);
    }

    @Override
    public void onClose(int i, String s, boolean b) {
        Log.d("Websocket", "Closed " + s);
    }

    @Override
    public void onError(Exception e) {
        Log.e("Websocket", "Error " + e.getMessage());
    }
}
