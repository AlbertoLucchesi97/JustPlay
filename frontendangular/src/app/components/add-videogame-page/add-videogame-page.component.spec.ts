import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostVideogameData, VideogamesState } from 'src/app/models/types';
import { AddVideogamePageComponent } from './add-videogame-page.component';
import { provideMockStore, MockStore} from '@ngrx/store/testing';
import { VideogamesDataService } from 'src/app/services/videogame-data.service';
import { AppRoutesModule } from 'src/app/app-routes.module';


describe('AddVideogamePageComponent Unit Tests', () => {
  let videogame: PostVideogameData;
  let mockStore: MockStore<{videogames: VideogamesState}>;
  let videogamesService: any;
  let mockRouter: any;
  let component: AddVideogamePageComponent;

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
    
    videogame = {
      title: 'Test',
      releaseDate: new Date(),
      genre: 'Test',
      softwareHouse: 'Test',
      publisher: 'Test',
      synopsis: 'Test',
      cover: 'Test',
      trailer: 'Test',
    };

    TestBed.configureTestingModule({
      declarations: [AddVideogamePageComponent],
      providers: [ VideogamesDataService, 
        provideMockStore({initialState}) ],
      imports: [AppRoutesModule, HttpClientModule]
    })

    mockStore = TestBed.inject(MockStore);
    videogamesService = TestBed.inject(VideogamesDataService);
    mockRouter = jasmine.createSpyObj('router', ['navigate']);
  
    component = new AddVideogamePageComponent(
      mockStore, videogamesService, mockRouter);
  });

  describe('submitForm', () => {
    it('should submit the data from the form', () => {
      let spy = spyOn(videogamesService, 'postVideogame').and.returnValue(of(HttpResponse));
      let subSpy = spyOn(videogamesService.postVideogame(), 'subscribe');
      component.submitForm();
      expect(spy).toHaveBeenCalledBefore(subSpy);
      expect(subSpy).toHaveBeenCalled();
    })
  });
});

describe('AddVideogamePage Integration Tests with VideogameService', () => {
  let videogame: PostVideogameData;
  let mockStore: MockStore<{videogames: VideogamesState}>;
  let videogamesService: VideogamesDataService;
  let mockRouter: any;
  let component: AddVideogamePageComponent;

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
    
    videogame = {
      title: 'Test',
      releaseDate: new Date(),
      genre: 'Test',
      softwareHouse: 'Test',
      publisher: 'Test',
      synopsis: 'Test',
      cover: 'Test',
      trailer: 'Test',
    };

    TestBed.configureTestingModule({
      declarations: [AddVideogamePageComponent],
      providers: [ VideogamesDataService, 
        provideMockStore({initialState}) ],
      imports: [AppRoutesModule, HttpClientModule]
    })

    mockStore = TestBed.inject(MockStore);
    videogamesService = TestBed.inject(VideogamesDataService);
    mockRouter = jasmine.createSpyObj('router', ['navigate']);
  
    component = new AddVideogamePageComponent(
      mockStore, videogamesService, mockRouter);
  });

  describe('submitForm', () => {

  })
})