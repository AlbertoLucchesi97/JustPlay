import { HttpClientModule, HttpResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { UserData, UserState, VideogameData, VideogamesState } from "src/app/models/types";
import { UserDataService } from "src/app/services/user-data.service";
import { VideogamesDataService } from "src/app/services/videogame-data.service";
import { HomePageComponent } from "./home-page.component";

describe('HomePageComponent', () => {
    let mockStore: MockStore<{videogames: VideogamesState, user: UserState}>;
    let videogamesService: any;
    let userService: any;
    let authService: any;
    let component: HomePageComponent;

    beforeEach(() => {
        const initialState = {
            'videogames': {
                loading: false,
                videogames: [],
                viewing: null,
                searched: [],
                added: null,
                submitting: false,
                submitted: false,
                deleted: false,
                sort: "",
                similarGames: [],
                newGames: [],
                gdrGames: [],
                fpsGames: [],
                openworldGames: [],
                racingGames: [],
                adventureGames: [],
                stealthGames: [],
                horrorGames: []
            },
            'user': {
                loading: false,
                user: null,
                videogamesOwned: [],
                videogamesWishlist: []
            }
    }

        TestBed.configureTestingModule({
            declarations: [HomePageComponent],
            providers: [ VideogamesDataService, UserDataService, 
                provideMockStore({initialState})],
            imports: [HttpClientModule]
            })

            mockStore = TestBed.inject(MockStore);
            videogamesService = TestBed.inject(VideogamesDataService);
            userService = TestBed.inject(UserDataService);
            authService = jasmine.createSpyObj('auth', ['isAuthenticated']);
            component = new HomePageComponent(mockStore, videogamesService, userService, authService);
            
    })

    describe('getVideogames', () => {
        it('should call getVideogames', () => {
            let spy = spyOn(videogamesService, 'getVideogamesSorted').and.returnValue(of(HttpResponse<VideogameData[]>));
            let subSpy = spyOn(videogamesService.getVideogamesSorted(), 'subscribe');
            component.getVideogames();
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })
    })

    describe('categorizeVideogames', () => {
        it('should call populateGenresList', () => {
            const videogames: VideogameData[] = [];
            let spy = spyOn(component, 'populateGenresList');
            component.categorizeVideogames(videogames);
            expect(spy).toHaveBeenCalled();
        })
    })

    describe('populateGenresList', () => {
        it('should fill the games for genres map', () => {
            component.populateGenresList();
            expect(component.gamesForGenres).not.toBeNull();
        })
    })

    describe('getUser', () => {
        it('should call getUser', () => {
            let spy = spyOn(userService, 'getUser').and.returnValue(of(HttpResponse<UserData>));
            let subSpy = spyOn(userService.getUser(), 'subscribe');
            component.getUser();
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })
    })

    describe('getUserOwned', () => {
        it('should call getVideogamesOwned', () => {
            let spy = spyOn(userService, 'getVideogamesOwned').and.returnValue(of(HttpResponse<VideogameData[]>));
            let subSpy = spyOn(userService.getVideogamesOwned(), 'subscribe');
            component.getUserOwned();
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })
    })

    describe('getUserWishlist', () => {
        it('should call getVideogamesWishlist', () => {
            let spy = spyOn(userService, 'getVideogamesWishlist').and.returnValue(of(HttpResponse<VideogameData[]>));
            let subSpy = spyOn(userService.getVideogamesWishlist(), 'subscribe');
            component.getUserWishlist();
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })
    })

    describe('changeSort', () => {
        it('should call getVideogames', () => {
            let spy = spyOn(component, 'getVideogames');
            component.changeSort();
            expect(spy).toHaveBeenCalled();
        })
    })
})