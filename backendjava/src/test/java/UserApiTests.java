import org.springframework.http.MediaType;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.justplay.backend.BackendJavaApplication;
import com.justplay.backend.models.VideogameOwned;
import com.justplay.backend.models.VideogameWishlist;

@SpringBootTest(classes = BackendJavaApplication.class)
@AutoConfigureMockMvc
public class UserApiTests {
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper mapper;

    @Test
    public void GetUserByEmail_ShouldReturnUserAndStatusOK() throws JsonProcessingException, Exception {
        this.mockMvc
        .perform(getRequestFactory("/api/users"))
        .andExpect(status().isOk())
        .andDo(print())
        .andExpect(content().string(containsString("test@test.com")));
    }

    @Test
    public void GetUserByEmail_WithoutAuthorization_ShouldReturnNotAuthorizedStatus() throws Exception {
        this.mockMvc
            .perform(get("/api/users"))
            .andExpect(status().is(401));
    }

    @Test
    public void GetUserVideogamesOwned_ShouldReturnListOfVideogamesAndStatusOK() throws Exception {
        this.mockMvc
            .perform(getRequestFactory("/api/users/videogamesOwned"))
            .andExpect(status().isOk())
            .andDo(print())
            .andExpect(content().string(containsString("Gran Turismo 7")));
    }

    @Test
    public void GetUserVideogamesWishlist_ShouldReturnListOfVideogamesAndStatusOK() throws Exception {
        this.mockMvc
            .perform(getRequestFactory("/api/users/videogamesWishlist"))
            .andExpect(status().isOk())
            .andDo(print())
            .andExpect(content().string(containsString("Splinter Cell Blacklist")));
    }

    @Test
    @Order(1)
    public void AddVideogameToWishlist_ShouldReturnVgWishlistAndStatusCreated() throws JsonProcessingException, Exception {
        VideogameWishlist videogameWishlist = new VideogameWishlist();
        videogameWishlist.setUserEmail("test@test.com");
        videogameWishlist.setVideogameId(21L);

        this.mockMvc
            .perform(postWishlistRequestFactory("/api/users/videogamesWishlist/add/21", mapper, videogameWishlist))
            .andExpect(status().isCreated())
            .andDo(print())
            .andExpect(content().string(containsString("test@test.com")));
    }

    @Test
    public void AddVideogamesToWishlist_WithoutAuthorization_ShouldReturnNotAuthorizedStatus() throws Exception {
        VideogameWishlist videogameWishlist = new VideogameWishlist();

        this.mockMvc
            .perform(post("/api/users/videogamesWishlist/21", mapper, videogameWishlist))
            .andExpect(status().is(403));
    }

    @Test
    @Order(2)
    public void AddVideogameToOwned_ShouldReturnVgOwnedAndStatusCreated() throws Exception {
        VideogameOwned videogameOwned = new VideogameOwned();
        videogameOwned.setUserEmail("test@test.com");
        videogameOwned.setVideogameId(20L);

        this.mockMvc
            .perform(postOwnedRequestFactory("/api/users/videogamesOwned/add/20", mapper, videogameOwned))
            .andExpect(status().isCreated())
            .andDo(print())
            .andExpect(content().string(containsString("test@test.com")));
    }

    @Test
    public void AddVideogamesToOwned_WithoutAuthorization_ShouldReturnNotAuthorizedStatus() throws Exception {
        VideogameOwned videogameOwned = new VideogameOwned();

        this.mockMvc
            .perform(post("/api/users/videogamesOwned/20", mapper, videogameOwned))
            .andExpect(status().is(403));
    }

    @Test
    @Order(3)
    public void DeleteVideogameFromWishlist_ShouldReturnVideogameId() throws JsonProcessingException, Exception {
        this.mockMvc
            .perform(deleteRequestFactory("/api/users/videogamesWishlist/remove/21"))
            .andDo(print())
            .andExpect(content().string(containsString("21")));
    }

    @Test
    public void DeleteVideogameFromWishlist_WithoutAuthorization_ShouldReturnNotAuthorizedStatus() throws Exception {
        this.mockMvc
            .perform(delete("/api/users/videogamesWishlist/remove/21"))
            .andExpect(status().is(403));
    }

    @Test
    @Order(4)
    public void DeleteVideogameFromOwned_ShouldReturnVideogameId() throws JsonProcessingException, Exception {
        this.mockMvc
            .perform(deleteRequestFactory("/api/users/videogamesOwned/remove/20"))
            .andDo(print())
            .andExpect(content().string(containsString("20")));
    }

    @Test
    public void DeleteVideogameFromOwned_WithoutAuthorization_ShouldReturnNotAuthorizedStatus() throws Exception {
        this.mockMvc
            .perform(delete("/api/users/videogamesOwned/remove/20"))
            .andExpect(status().is(403));
    }

    //#region AuthorizationMethods
    public static MockHttpServletRequestBuilder getRequestFactory(String url) throws JsonProcessingException {
        String adminAccessToken = "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkU5YnN4VHdJbHhIZ01BRW94QWpEXyJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImh0dHBzOi8vanVzdHBsYXkuY29tL3JvbGVzIjpbImFkbWluIl0sImlzcyI6Imh0dHBzOi8vZGV2LXN0ZGlyNm54LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MjgzN2RmMjViYmZhYzAwNjcxNzFlZmUiLCJhdWQiOlsiaHR0cHM6Ly9qdXN0cGxheSIsImh0dHBzOi8vZGV2LXN0ZGlyNm54LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NTY2NzQ4NDIsImV4cCI6MTY1OTI2Njg0MiwiYXpwIjoiT21lM1pEVE9CRUNyV1RFQ2xSRWFmTDZoVzBneXlaYTgiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOlsiYWRkdG9vd25lZDp2aWRlb2dhbWVzIiwiYWRkdG93aXNobGlzdDp2aWRlb2dhbWVzIiwiY3JlYXRlOnZpZGVvZ2FtZXMiLCJkZWxldGU6dmlkZW9nYW1lcyIsInJlbW92ZWZyb21vd25lZDp2aWRlb2dhbWVzIiwicmVtb3ZlZnJvbXdpc2hsaXN0OnZpZGVvZ2FtZXMiLCJ1cGRhdGU6dmlkZW9nYW1lcyJdfQ.Ugxm4AAAsWfkFDs5AlmJCA3-S_YedqEFNJe9g8E33JhQMS9aC5kB89F0BeIjjQlBcy-GPhhw-eZg4S-Qi5SsyzGFSHY_e4GoCs0VLDFEzhZaMAyWuu3PqYZVvsXEjMAdDVM-H4Kjw11qcJQopE1zTF-Jln-zWnx2NxKGDycCXDWL1ukfkSEpfq4r1EoNZYoSfCJf1P9EiJ7IwMTTFhVlTla6yyYPYeU7tBCutbL-NZEfUUfABFS7-qs9o1_PO-BaMiq4beAjFyhIXpR_J0Eg6DOLs34Mx8Qj4lKwq-qHhNhx5nU18_sUU0SnfLV2t5L-WPpO1WBUHi7sJrM7Y3Xs0A";
        
        return MockMvcRequestBuilders.get(url)
                .header(HttpHeaders.AUTHORIZATION, adminAccessToken);
    }

    public static MockHttpServletRequestBuilder postWishlistRequestFactory(String url, ObjectMapper mapper, VideogameWishlist videogameWishlist) throws JsonProcessingException {
        String adminAccessToken = "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkU5YnN4VHdJbHhIZ01BRW94QWpEXyJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImh0dHBzOi8vanVzdHBsYXkuY29tL3JvbGVzIjpbImFkbWluIl0sImlzcyI6Imh0dHBzOi8vZGV2LXN0ZGlyNm54LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MjgzN2RmMjViYmZhYzAwNjcxNzFlZmUiLCJhdWQiOlsiaHR0cHM6Ly9qdXN0cGxheSIsImh0dHBzOi8vZGV2LXN0ZGlyNm54LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NTY2NzQ4NDIsImV4cCI6MTY1OTI2Njg0MiwiYXpwIjoiT21lM1pEVE9CRUNyV1RFQ2xSRWFmTDZoVzBneXlaYTgiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOlsiYWRkdG9vd25lZDp2aWRlb2dhbWVzIiwiYWRkdG93aXNobGlzdDp2aWRlb2dhbWVzIiwiY3JlYXRlOnZpZGVvZ2FtZXMiLCJkZWxldGU6dmlkZW9nYW1lcyIsInJlbW92ZWZyb21vd25lZDp2aWRlb2dhbWVzIiwicmVtb3ZlZnJvbXdpc2hsaXN0OnZpZGVvZ2FtZXMiLCJ1cGRhdGU6dmlkZW9nYW1lcyJdfQ.Ugxm4AAAsWfkFDs5AlmJCA3-S_YedqEFNJe9g8E33JhQMS9aC5kB89F0BeIjjQlBcy-GPhhw-eZg4S-Qi5SsyzGFSHY_e4GoCs0VLDFEzhZaMAyWuu3PqYZVvsXEjMAdDVM-H4Kjw11qcJQopE1zTF-Jln-zWnx2NxKGDycCXDWL1ukfkSEpfq4r1EoNZYoSfCJf1P9EiJ7IwMTTFhVlTla6yyYPYeU7tBCutbL-NZEfUUfABFS7-qs9o1_PO-BaMiq4beAjFyhIXpR_J0Eg6DOLs34Mx8Qj4lKwq-qHhNhx5nU18_sUU0SnfLV2t5L-WPpO1WBUHi7sJrM7Y3Xs0A";
        
        return MockMvcRequestBuilders.post(url)
                .header(HttpHeaders.AUTHORIZATION, adminAccessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(videogameWishlist))
                .accept(MediaType.APPLICATION_JSON);
    }

    public static MockHttpServletRequestBuilder postOwnedRequestFactory(String url, ObjectMapper mapper, VideogameOwned videogameOwned) throws JsonProcessingException {
        String adminAccessToken = "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkU5YnN4VHdJbHhIZ01BRW94QWpEXyJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImh0dHBzOi8vanVzdHBsYXkuY29tL3JvbGVzIjpbImFkbWluIl0sImlzcyI6Imh0dHBzOi8vZGV2LXN0ZGlyNm54LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MjgzN2RmMjViYmZhYzAwNjcxNzFlZmUiLCJhdWQiOlsiaHR0cHM6Ly9qdXN0cGxheSIsImh0dHBzOi8vZGV2LXN0ZGlyNm54LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NTY2NzQ4NDIsImV4cCI6MTY1OTI2Njg0MiwiYXpwIjoiT21lM1pEVE9CRUNyV1RFQ2xSRWFmTDZoVzBneXlaYTgiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOlsiYWRkdG9vd25lZDp2aWRlb2dhbWVzIiwiYWRkdG93aXNobGlzdDp2aWRlb2dhbWVzIiwiY3JlYXRlOnZpZGVvZ2FtZXMiLCJkZWxldGU6dmlkZW9nYW1lcyIsInJlbW92ZWZyb21vd25lZDp2aWRlb2dhbWVzIiwicmVtb3ZlZnJvbXdpc2hsaXN0OnZpZGVvZ2FtZXMiLCJ1cGRhdGU6dmlkZW9nYW1lcyJdfQ.Ugxm4AAAsWfkFDs5AlmJCA3-S_YedqEFNJe9g8E33JhQMS9aC5kB89F0BeIjjQlBcy-GPhhw-eZg4S-Qi5SsyzGFSHY_e4GoCs0VLDFEzhZaMAyWuu3PqYZVvsXEjMAdDVM-H4Kjw11qcJQopE1zTF-Jln-zWnx2NxKGDycCXDWL1ukfkSEpfq4r1EoNZYoSfCJf1P9EiJ7IwMTTFhVlTla6yyYPYeU7tBCutbL-NZEfUUfABFS7-qs9o1_PO-BaMiq4beAjFyhIXpR_J0Eg6DOLs34Mx8Qj4lKwq-qHhNhx5nU18_sUU0SnfLV2t5L-WPpO1WBUHi7sJrM7Y3Xs0A";
        
        return MockMvcRequestBuilders.post(url)
                .header(HttpHeaders.AUTHORIZATION, adminAccessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(videogameOwned))
                .accept(MediaType.APPLICATION_JSON);
    }

    public static MockHttpServletRequestBuilder deleteRequestFactory(String url) throws JsonProcessingException {
        String adminAccessToken = "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkU5YnN4VHdJbHhIZ01BRW94QWpEXyJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImh0dHBzOi8vanVzdHBsYXkuY29tL3JvbGVzIjpbImFkbWluIl0sImlzcyI6Imh0dHBzOi8vZGV2LXN0ZGlyNm54LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MjgzN2RmMjViYmZhYzAwNjcxNzFlZmUiLCJhdWQiOlsiaHR0cHM6Ly9qdXN0cGxheSIsImh0dHBzOi8vZGV2LXN0ZGlyNm54LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NTY2NzQ4NDIsImV4cCI6MTY1OTI2Njg0MiwiYXpwIjoiT21lM1pEVE9CRUNyV1RFQ2xSRWFmTDZoVzBneXlaYTgiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOlsiYWRkdG9vd25lZDp2aWRlb2dhbWVzIiwiYWRkdG93aXNobGlzdDp2aWRlb2dhbWVzIiwiY3JlYXRlOnZpZGVvZ2FtZXMiLCJkZWxldGU6dmlkZW9nYW1lcyIsInJlbW92ZWZyb21vd25lZDp2aWRlb2dhbWVzIiwicmVtb3ZlZnJvbXdpc2hsaXN0OnZpZGVvZ2FtZXMiLCJ1cGRhdGU6dmlkZW9nYW1lcyJdfQ.Ugxm4AAAsWfkFDs5AlmJCA3-S_YedqEFNJe9g8E33JhQMS9aC5kB89F0BeIjjQlBcy-GPhhw-eZg4S-Qi5SsyzGFSHY_e4GoCs0VLDFEzhZaMAyWuu3PqYZVvsXEjMAdDVM-H4Kjw11qcJQopE1zTF-Jln-zWnx2NxKGDycCXDWL1ukfkSEpfq4r1EoNZYoSfCJf1P9EiJ7IwMTTFhVlTla6yyYPYeU7tBCutbL-NZEfUUfABFS7-qs9o1_PO-BaMiq4beAjFyhIXpR_J0Eg6DOLs34Mx8Qj4lKwq-qHhNhx5nU18_sUU0SnfLV2t5L-WPpO1WBUHi7sJrM7Y3Xs0A";
        
        return MockMvcRequestBuilders.delete(url)
                .header(HttpHeaders.AUTHORIZATION, adminAccessToken);
    }

    //#endregion
}
