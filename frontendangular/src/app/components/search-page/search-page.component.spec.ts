import { TestBed } from "@angular/core/testing";
import { VideogamesDataService } from "src/app/services/videogame-data.service";
import { SearchPageComponent } from "./search-page.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { HttpClientModule, HttpResponse } from "@angular/common/http";
import { VideogameData, VideogamesState } from "src/app/models/types";
import { ActivatedRoute, convertToParamMap } from "@angular/router";

describe('SearchPageComponent', () => {

    let component: SearchPageComponent;
    let mockStore: MockStore<{videogames: VideogamesState}>;
    let mockRoute: ActivatedRoute;
    let videogamesService: any;

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
            declarations: [SearchPageComponent],
            providers: [ VideogamesDataService, 
                provideMockStore({initialState}),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of(({criteria: "test"}))
                    }
                }],
            imports: [HttpClientModule]
        })

        mockStore = TestBed.inject(MockStore);
        videogamesService = TestBed.inject(VideogamesDataService);
        mockRoute = TestBed.inject(ActivatedRoute);
        component = new SearchPageComponent(mockStore, videogamesService, mockRoute);
    })

    describe('searchVideogames', () => {
        it('should call getSearchedVideogames', () => {
            let spy = spyOn(videogamesService, 'getSearchedVideogames').and.returnValue(of(HttpResponse<VideogameData[]>));
            let subSpy = spyOn(videogamesService.getSearchedVideogames(), 'subscribe');
            component.searchVideogames();
            expect(spy).toHaveBeenCalledBefore(subSpy);
            expect(subSpy).toHaveBeenCalled();
        })
    })
})