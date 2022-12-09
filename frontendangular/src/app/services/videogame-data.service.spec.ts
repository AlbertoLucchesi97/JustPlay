import { HttpClient } from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { VideogameData } from "../models/types";
import { VideogamesDataService } from "./videogame-data.service";

describe('Videogames Data Service', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let videogamesDataService: VideogamesDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        videogamesDataService = new VideogamesDataService(httpClient);
    });

    it('should call getVideogame once', () => {
        const testData: VideogameData =
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
            }; 

        videogamesDataService.getVideogame(1).subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/videogames/1');
        request.flush(testData);
    })

    it('should call getVideogames once', () => {
        const testData: VideogameData =
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
            }; 

        videogamesDataService.getVideogames().subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/videogames');
        request.flush(testData);
    })

    it('should call getVideogamesSorted once', () => {
        const testData: VideogameData =
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
            }; 

        videogamesDataService.getVideogamesSorted("title").subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/videogames?sort=title');
        request.flush(testData);
    })

    it('should call getSearchedVideogames once', () => {
        const testData: VideogameData =
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
            }; 

        videogamesDataService.getSearchedVideogames("test").subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/videogames?search=test');
        request.flush(testData);
    })

    it('should call postVideogame once', () => {
        const testData: VideogameData =
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
            }; 

        videogamesDataService.postVideogame(testData).subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/videogames/add');
        request.flush(testData);
    })

    it('should call putVideogame once', () => {
        const testData: VideogameData =
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
            }; 

        videogamesDataService.putVideogame(1, testData).subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/videogames/edit/1');
        request.flush(testData);
    })

    it('should call deleteVideogame once', () => {
        const testData: VideogameData =
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
            }; 

        videogamesDataService.deleteVideogame(1).subscribe((response) => {
        });

        const request = httpTestingController.expectOne('http://localhost:8080/api/videogames/delete/1');
        request.flush(testData);
    })
})