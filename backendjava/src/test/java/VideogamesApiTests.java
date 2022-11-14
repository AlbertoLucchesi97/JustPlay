import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.justplay.backend.BackendJavaApplication;
import com.justplay.backend.models.Videogame;

@SpringBootTest(classes = BackendJavaApplication.class)
@AutoConfigureMockMvc
public class VideogamesApiTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    
    @Test
    public void GetAllVideogames_ShouldReturnAListAndStatusOK() throws Exception {
        this.mockMvc
            .perform(get("/api/videogames"))
            .andExpect(status().isOk())
            .andDo(print())
            .andExpect(content().string(containsString("title")));
    }

    @Test
    public void GetAllVideogamesSortedByTitle_ShouldReturnAListStatusOK() throws Exception {
        this.mockMvc
            .perform(get("/api/videogames?sort=title"))
            .andExpect(status().isOk())
            .andDo(print())
            .andExpect(content().string(containsString("title")));
    }

    @Test
    public void GetAllVideogamesSortedByYear_ShouldReturnAListStatusOK() throws Exception {
        this.mockMvc
            .perform(get("/api/videogames?sort=year"))
            .andExpect(status().isOk())
            .andDo(print())
            .andExpect(content().string(containsString("title")));
    }

    @Test
    public void GetVideogameBySearching_ShouldReturnStatusOK() throws Exception {
        this.mockMvc
            .perform(get("/api/videogames?search=Bloodborne"))
            .andExpect(status().isOk())
            .andDo(print())
            .andExpect(content().string(containsString("Bloodborne")));
    }
    
    @Test
    public void GetVideogame_ShouldReturnStatusOkAndVideogame() throws Exception {
        this.mockMvc
            .perform(get("/api/videogames/1"))
            .andExpect(status().isOk())
            .andDo(print())
            .andExpect(content().string(containsString("title")));
    }

    @Test
    public void GetVideogame_WithInvalidId_ShouldReturnStatusNotFound() throws Exception {
        this.mockMvc
            .perform(get("/api/videogames/80"))
            .andExpect(status().isNotFound());
    }

    @Test
    public void PostVideogame_ShouldReturnStatusCreated() throws JsonProcessingException, Exception {
        Videogame videogame = new Videogame();
        videogame.setTitle("Title");
        videogame.setReleaseDate(new Date(2022-01-01));
        videogame.setGenre("adventure");
        videogame.setSoftwareHouse("softwareHouse");
        videogame.setPublisher("publisher");
        videogame.setSynopsis("synopsis");
        videogame.setCover("cover");
        videogame.setTrailer("trailer");

        this.mockMvc
            .perform(postRequestFactory("/api/videogames/add", mapper, videogame))
            .andExpect(status().isCreated())
            .andDo(print())
            .andExpect(content().string(containsString("Title")));
    }
    
    @Test
    public void PutVideogame_ShouldReturnVideogameAndStatusOk() throws JsonProcessingException, Exception {
        Videogame videogame = new Videogame();
        videogame.setTitle("TitleUpdated");
        videogame.setReleaseDate(new Date(2022-01-01));
        videogame.setGenre("adventureUpdated");
        videogame.setSoftwareHouse("softwareHouseUpdated");
        videogame.setPublisher("publisherUpdated");
        videogame.setSynopsis("synopsisUpdated");
        videogame.setCover("coverUpdated");
        videogame.setTrailer("trailerUpdated");

        this.mockMvc
            .perform(putRequestFactory("/api/videogames/edit/23", mapper, videogame))
            .andExpect(status().isOk())
            .andDo(print())
            .andExpect(content().string(containsString("TitleUpdated")));
    }

    @Test
    public void PutVideogame_WithInvalidId_ShouldReturnStatusNotFound() throws JsonProcessingException, Exception {
        Videogame videogame = new Videogame();
        
        this.mockMvc
        .perform(putRequestFactory("/api/videogames/edit/300", mapper, videogame))
        .andExpect(status().isNotFound());
    }

    // @Test
    // public void DeleteVideogame_ShouldReturnStatusNoContent() throws JsonProcessingException, Exception {
    //     this.mockMvc
    //         .perform(delete("/api/videogames/5"))
    //         .andExpect(status().isNoContent());
    // }

    // @Test
    // public void DeleteVideogame_WithInvalidId_ShouldReturnStatusNotFound() throws Exception {
    //     this.mockMvc
    //         .perform(delete("/api/videogames/150"))
    //         .andExpect(status().isNotFound());
    // }

    public static MockHttpServletRequestBuilder postRequestFactory(String url, ObjectMapper mapper, Videogame videogame) throws JsonProcessingException {
        String adminAccessToken = "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkU5YnN4VHdJbHhIZ01BRW94QWpEXyJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImh0dHBzOi8vanVzdHBsYXkuY29tL3JvbGVzIjpbImFkbWluIl0sImlzcyI6Imh0dHBzOi8vZGV2LXN0ZGlyNm54LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MjgzN2RmMjViYmZhYzAwNjcxNzFlZmUiLCJhdWQiOlsiaHR0cHM6Ly9qdXN0cGxheSIsImh0dHBzOi8vZGV2LXN0ZGlyNm54LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NjAyMTYzMDgsImV4cCI6MTY2MjgwODMwOCwiYXpwIjoiT21lM1pEVE9CRUNyV1RFQ2xSRWFmTDZoVzBneXlaYTgiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOlsiYWRkdG9vd25lZDp2aWRlb2dhbWVzIiwiYWRkdG93aXNobGlzdDp2aWRlb2dhbWVzIiwiY3JlYXRlOnZpZGVvZ2FtZXMiLCJkZWxldGU6dmlkZW9nYW1lcyIsInJlbW92ZWZyb21vd25lZDp2aWRlb2dhbWVzIiwicmVtb3ZlZnJvbXdpc2hsaXN0OnZpZGVvZ2FtZXMiLCJ1cGRhdGU6dmlkZW9nYW1lcyJdfQ.fMl-62GVeFvOqI0CeGMGcKWCgxHW5isfYu8X7llmS3D9vs2WZgj0JPTYS0CGyvumABBmm0FIU62BW0r4xdghxeVKPnmTe5QBFcy3wwtPm2vK0Y5kxqpRtUxnGDO1C8j5En6EfxQWDEg_ynhLLIfqLk3F5iPR_LhPhjKEQeulfWTuwZj6XUzUshxLvI5ikF25oeKPArZ0xfnBLk8xhvkBwm3keAy7jOXmLCH2s5_ztqa0NnAU11yS-DM-HO1y892eEGd8d3NpnzThv98rPUKquQwjWYLWXVLj5aQCU0lYUIPD0wJSga85rTYa9l3qBbkeXUZ72-zcuQqPERJdtvXdJQ";
        
        return MockMvcRequestBuilders.post(url)
                .header(HttpHeaders.AUTHORIZATION, adminAccessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(videogame))
                .accept(MediaType.APPLICATION_JSON);
    }

    public static MockHttpServletRequestBuilder putRequestFactory(String url, ObjectMapper mapper, Videogame videogame) throws JsonProcessingException {
        String adminAccessToken = "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkU5YnN4VHdJbHhIZ01BRW94QWpEXyJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImh0dHBzOi8vanVzdHBsYXkuY29tL3JvbGVzIjpbImFkbWluIl0sImlzcyI6Imh0dHBzOi8vZGV2LXN0ZGlyNm54LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MjgzN2RmMjViYmZhYzAwNjcxNzFlZmUiLCJhdWQiOlsiaHR0cHM6Ly9qdXN0cGxheSIsImh0dHBzOi8vZGV2LXN0ZGlyNm54LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NjAyMTYzMDgsImV4cCI6MTY2MjgwODMwOCwiYXpwIjoiT21lM1pEVE9CRUNyV1RFQ2xSRWFmTDZoVzBneXlaYTgiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOlsiYWRkdG9vd25lZDp2aWRlb2dhbWVzIiwiYWRkdG93aXNobGlzdDp2aWRlb2dhbWVzIiwiY3JlYXRlOnZpZGVvZ2FtZXMiLCJkZWxldGU6dmlkZW9nYW1lcyIsInJlbW92ZWZyb21vd25lZDp2aWRlb2dhbWVzIiwicmVtb3ZlZnJvbXdpc2hsaXN0OnZpZGVvZ2FtZXMiLCJ1cGRhdGU6dmlkZW9nYW1lcyJdfQ.fMl-62GVeFvOqI0CeGMGcKWCgxHW5isfYu8X7llmS3D9vs2WZgj0JPTYS0CGyvumABBmm0FIU62BW0r4xdghxeVKPnmTe5QBFcy3wwtPm2vK0Y5kxqpRtUxnGDO1C8j5En6EfxQWDEg_ynhLLIfqLk3F5iPR_LhPhjKEQeulfWTuwZj6XUzUshxLvI5ikF25oeKPArZ0xfnBLk8xhvkBwm3keAy7jOXmLCH2s5_ztqa0NnAU11yS-DM-HO1y892eEGd8d3NpnzThv98rPUKquQwjWYLWXVLj5aQCU0lYUIPD0wJSga85rTYa9l3qBbkeXUZ72-zcuQqPERJdtvXdJQ";
        
        return MockMvcRequestBuilders.put(url)
                .header(HttpHeaders.AUTHORIZATION, adminAccessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(videogame))
                .accept(MediaType.APPLICATION_JSON);
    }
}
