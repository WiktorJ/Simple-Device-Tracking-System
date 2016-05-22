package pl.edu.agh.simpletransmitter;

import android.location.Location;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;

/**
 * Created by wiktor on 22/05/16.
 */
public class Utils {

    private static final String LATITUDE = "latitude";
    private static final String LONGITUDE= "longitude";

    public static JSONObject buildLocationJSON(Location location, Boolean stop) throws JSONException {
        JSONObject requestObject = new JSONObject();
        requestObject.put("type", "update");
        JSONObject jsonObject = new JSONObject();
        String lat = "9999";
        String lon = "9999";
        if(location != null) {
            lat = Double.toString(location.getLatitude());
            lon = Double.toString(location.getLongitude());
        }
        jsonObject.put(LATITUDE, lat);
        jsonObject.put(LONGITUDE, lon);
        jsonObject.put("stop", stop);
        jsonObject.put("timestamp", getTimestamp());
        requestObject.put("data", jsonObject);
        return requestObject;
    }

    public static JSONObject buildKeepAliveJSON() throws JSONException {
        JSONObject requestObject = new JSONObject();
        requestObject.put("type", "keepAlive");
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("timestamp", getTimestamp());
        requestObject.put("data", jsonObject);
        return requestObject;
    }

    public static long getTimestamp() {
        Calendar c = Calendar.getInstance();
        return c.getTimeInMillis();
    }

}
