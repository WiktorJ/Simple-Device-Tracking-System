package pl.edu.agh.simpletransmitter;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.TextView;

import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInResult;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;

import java.io.IOException;

import pl.edu.agh.simpletransmitter.security.AuthClient;
import pl.edu.agh.simpletransmitter.security.AuthService;
import pl.edu.agh.simpletransmitter.security.dao.User;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A login screen that offers login via email/password.
 */
public class Login extends AppCompatActivity {

    /**
     * Id to identity READ_CONTACTS permission request.
     */
    private static final String TAG = "SignInActivity";
    private static final int RC_SIGN_IN = 9001;

    private GoogleApiClient mGoogleApiClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.server_client_id))
                .requestEmail()
                .build();

        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .enableAutoManage(this /* FragmentActivity */, new GoogleApiClient.OnConnectionFailedListener() {
                    @Override
                    public void onConnectionFailed(ConnectionResult connectionResult) {
                        Log.d("Login", "Connection failed in GoogleApiClient");
                    }
                })
                .addApi(Auth.GOOGLE_SIGN_IN_API, gso)
                .build();

        findViewById(R.id.sign_in_button).setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent signInIntent = Auth.GoogleSignInApi.getSignInIntent(mGoogleApiClient);
                startActivityForResult(signInIntent, RC_SIGN_IN);
            }
        });

    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == RC_SIGN_IN) {
            GoogleSignInResult result = Auth.GoogleSignInApi.getSignInResultFromIntent(data);
            Log.d(TAG, "handleSignInResult:" + result.getStatus().getStatusMessage());
            if (result.isSuccess()) {
                // Signed in successfully, show authenticated UI.
                GoogleSignInAccount acct = result.getSignInAccount();
                TextView viewById = (TextView) findViewById(R.id.googleSingInTxt);
                if (viewById != null) {
                    viewById.setVisibility(View.VISIBLE);
                    viewById.setText(acct.getEmail());
                }
                AuthClient service = AuthService.createService(AuthClient.class, acct.getIdToken());
                Call<String> login = service.login2();
                login.enqueue(new Callback<String>() {
                    @Override
                    public void onResponse(Call<String> call, Response<String> response) {
                        if(response.code() == 200) {
                            startActivity(new Intent(getApplicationContext(), Start.class));
                        } else if (response.code() == 401) {
                            //TODO: Authentication error. Should occur when token not matches with Google's
                            Log.d(TAG, "Cannot auth user");
                        } else {
                            //TODO: Some "error" message
                            Log.d(TAG, "Status code: " + response.code());
                        }

                        Log.d(TAG, "Got response from server: " + response.message());
                    }

                    @Override
                    public void onFailure(Call<String> call, Throwable t) {
                        //TODO: Show auth error message
                        Log.w(TAG, "Failure Response: ", t);
                    }
                });

            } else {
                //TODO: Show "unauthenticated " message
                Log.d(TAG, "(false)");
            }
        }
    }


}

