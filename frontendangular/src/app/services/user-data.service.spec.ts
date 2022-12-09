import { HttpClient } from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { UserData, VideogameData } from "../models/types";
import { UserDataService } from "./user-data.service";

describe('User Data Service', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let userDataService: UserDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        userDataService = new UserDataService(httpClient);
    });

    it('should call getUser once', () => {
        const testData: UserData = { 
            id: 1,
            email: 'test@test.com',
            auth: '',
            admin: false,
            videogamesOwned: [],
            videogamesWishlist: []
        };

        userDataService.getUser().subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/users');
        request.flush(testData);
    })

    it('should call getVideogamesOwned once', () => {
        const testData: VideogameData[] = [
            {  
                id: 1,
                title: 'Test',
                releaseDate: new Date(1/1/2022),
                genre: 'GDR',
                softwareHouse: 'Test',
                publisher: 'Test',
                synopsis: 'Test',
                cover: 'Test',
                trailer: 'Test',  
                }
        ]; 

        userDataService.getVideogamesOwned().subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/users/videogamesOwned');
        request.flush(testData);
    })

    it('should call getVideogamesWishlist once', () => {
        const testData: VideogameData[] = [
            {  
                id: 1,
                title: 'Test',
                releaseDate: new Date(1/1/2022),
                genre: 'GDR',
                softwareHouse: 'Test',
                publisher: 'Test',
                synopsis: 'Test',
                cover: 'Test',
                trailer: 'Test',  
                }
        ]; 

        userDataService.getVideogamesWishlist().subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/users/videogamesWishlist');
        request.flush(testData);
    
    })

    it('should call addVideogameToOwned once', () => {
        const testData = 1; 

        userDataService.addVideogameToOwned(1).subscribe((response) => {

        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/users/videogamesOwned/add/1');
        request.flush(testData);
    })

    it('should call addVideogameToWishlist once', () => {
        const testData = 1; 

        userDataService.addVideogameToWishlist(1).subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/users/videogamesWishlist/add/1');
        request.flush(testData);
    })

    it('should call removeVideogameFromOwned once', () => {
        const testData = 1; 

        userDataService.removeVideogameFromOwned(1).subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/users/videogamesOwned/remove/1');
        request.flush(testData);
    })

    it('should call removeVideogameFromWishlist once', () => {
        const testData = 1; 

        userDataService.removeVideogameFromWishlist(1).subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/users/videogamesWishlist/remove/1');
        request.flush(testData);
    })
})