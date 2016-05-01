package pl.edu.agh.simpletransmitter;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Start extends AppCompatActivity {

    private boolean isTransmissionActive = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);
    }

    public void startStopOnClick(View v) {
        if(!isTransmissionActive) {
            v.setBackgroundColor(getResources().getColor(R.color.stop_tracking_color));
            ((Button) v).setText(R.string.stop_text);
        } else {
            v.setBackgroundColor(getResources().getColor(R.color.start_tracking_color));
            ((Button) v).setText(R.string.start_text);
        }
        isTransmissionActive = !isTransmissionActive;
    }

}
