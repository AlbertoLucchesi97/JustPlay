import { HttpClientModule, HttpResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { UserDataService } from "src/app/services/user-data.service";
import { VideogamesDataService } from "src/app/services/videogame-data.service";
import { VideogamePageComponent } from "./videogame-page.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { UserState, VideogameData, VideogamesState } from "src/app/models/types";
import { ActivatedRoute, convertToParamMap } from "@angular/router";

describe('VideogamePageComponent', () => {

    let mockStore: MockStore<{videogames: VideogamesState, user: UserState}>;
    let videogamesService: any;
    let userService: any;
    let authService: any;
    let mockSanitizer: any;
    let mockRoute: any;
    let component: VideogamePageComponent;

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
            declarations: [VideogamePageComponent],
            providers: [ VideogamesDataService, UserDataService, 
                provideMockStore({initialState}),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of(convertToParamMap({id: 1})),
                        params: of(true)
                    }
                }],
            imports: [HttpClientModule]
            })

            mockStore = TestBed.inject(MockStore);
            mockRoute = TestBed.inject(ActivatedRoute);
            videogamesService = TestBed.inject(VideogamesDataService);
            userService = TestBed.inject(UserDataService);
            authService = jasmine.createSpyObj('auth', ['isAuthenticated']);
            mockSanitizer = jasmine.createSpyObj('sanitizer', ['bypassSecurityTrustResourceUrl']);
            component = new VideogamePageComponent(mockRoute, videogamesService, userService, mockStore, mockSanitizer, authService);
    })

    describe('getVideogameData', () => {
        it('should call getVideogame', () => {
            let spy = spyOn(videogamesService, 'getVideogame').and.returnValue(of(HttpResponse<VideogameData>));
            let subSpy = spyOn(videogamesService.getVideogame(), 'subscribe');
            component.getVideogameData();
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })
    })

    describe('onRemoveVideogameFromWishlist', () => {
        it('should call removeVideogameFromWishlist', () => {
            let spy = spyOn(userService, 'removeVideogameFromWishlist').and.returnValue(of(HttpResponse));
            let subSpy = spyOn(userService.removeVideogameFromWishlist(), 'subscribe');
            component.onRemoveVideogameFromWishlist();
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })
    })

    describe('onAddVideogameToWishlist', () => {
        it('should call addVideogameToWishlist', ()=> {
            let spy = spyOn(userService, 'addVideogameToWishlist').and.returnValue(of(HttpResponse));
            let subSpy = spyOn(userService.addVideogameToWishlist(), 'subscribe');
            component.onAddVideogameToWishlist();
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })
    })

    describe('onAddVideogameToOwned', () => {
        it('should call addVideogameToOwned', ()=> {
            let spy = spyOn(userService, 'addVideogameToOwned').and.returnValue(of(HttpResponse));
            let subSpy = spyOn(userService.addVideogameToOwned(), 'subscribe');
            component.onAddVideogameToOwned();
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })
    })

    describe('onRemoveVideogameFromOwned', () => {
        it('should call removeVideogameFromOwned', () => {
            let spy = spyOn(userService, 'removeVideogameFromOwned').and.returnValue(of(HttpResponse));
            let subSpy = spyOn(userService.removeVideogameFromOwned(), 'subscribe');
            component.onRemoveVideogameFromOwned();
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })
    })

    describe('submitForm', () => {
        it('should call deleteVideogame', () => {
            let spy = spyOn(videogamesService, 'deleteVideogame').and.returnValue(of(HttpResponse));
            let subSpy = spyOn(videogamesService.deleteVideogame(), 'subscribe');
            component.submitForm();
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })
    })
})