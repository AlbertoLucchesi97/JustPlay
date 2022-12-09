import { HttpClientModule, HttpResponse } from "@angular/common/http"
import { TestBed } from "@angular/core/testing"
import { ActivatedRoute, convertToParamMap } from "@angular/router"
import { provideMockStore, MockStore } from "@ngrx/store/testing"
import { of } from "rxjs/internal/observable/of"
import { AppRoutesModule } from "src/app/app-routes.module"
import { PostVideogameData, VideogameData, VideogamesState } from "src/app/models/types"
import { VideogamesDataService } from "src/app/services/videogame-data.service"
import { EditVideogamePageComponent } from "./edit-videogame-page.component"

describe('EditVideogamePageComponent', () => {
    let videogame: PostVideogameData;
    let mockStore: MockStore<{videogames: VideogamesState}>;
    let videogamesService: any;
    let mockRoute: any;
    let mockRouter: any;
    let component: EditVideogamePageComponent;

    beforeEach(() => {
        const initialState = {
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
        }

        TestBed.configureTestingModule({
        declarations: [EditVideogamePageComponent],
        providers: [ VideogamesDataService, 
            provideMockStore({initialState}),
            {
                provide: ActivatedRoute,
                useValue: {
                    paramMap: of(convertToParamMap({id: 1}))
                }
            }],
        imports: [AppRoutesModule, HttpClientModule]
        })

        mockStore = TestBed.inject(MockStore);
        videogamesService = TestBed.inject(VideogamesDataService);
        mockRoute = TestBed.inject(ActivatedRoute);
        mockRouter = jasmine.createSpyObj('router', ['navigate']);
        
          component = new EditVideogamePageComponent(
            mockStore, videogamesService, mockRoute, mockRouter);
    })

    describe('getVideogame', () => {
        it('should call getVideogame', () => {
            let spy = spyOn(videogamesService, 'getVideogame').and.returnValue(of(HttpResponse<VideogameData>));
            let subSpy = spyOn(videogamesService.getVideogame(), 'subscribe');
            component.getVideogame(1);
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })
    })

    describe('submitForm', () => {
        it('should submit the data from the form', () => {
            let spy = spyOn(videogamesService, 'putVideogame').and.returnValue(of(HttpResponse));
            let subSpy = spyOn(videogamesService.putVideogame(), 'subscribe');
            component.videogameUpdated = {
                title: 'Test',
                releaseDate: new Date(),
                genre: 'Test',
                softwareHouse: 'Test',
                publisher: 'Test',
                synopsis: 'Test',
                cover: 'Test',
                trailer: 'Test',
                };
            component.id = "1";

            component.submitForm();
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })

        it('should fail if videogames is not set and id is not set', () => {
            let spy = spyOn(videogamesService, 'putVideogame').and.returnValue(of(HttpResponse));
            let subSpy = spyOn(videogamesService.putVideogame(), 'subscribe');
            component.videogameUpdated = null;
            component.id = null;
            component.submitForm();
            expect(subSpy).toHaveBeenCalledTimes(0);
        })
    })
})