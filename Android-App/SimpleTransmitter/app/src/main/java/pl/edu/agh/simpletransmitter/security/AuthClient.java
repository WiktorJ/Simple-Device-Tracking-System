package pl.edu.agh.simpletransmitter.security;

import pl.edu.agh.simpletransmitter.security.dao.User;
import retrofit2.Call;
import retrofit2.http.POST;

/**
 * Created by wiktor on 02/06/16.
 */
public interface AuthClient {
    @POST("/auth/login")
    Call<User> login();
}
