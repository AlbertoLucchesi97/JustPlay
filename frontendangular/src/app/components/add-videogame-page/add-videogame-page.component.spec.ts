import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideogamePageComponent } from './add-videogame-page.component';

describe('AddVideogamePageComponent', () => {
  let component: AddVideogamePageComponent;
  let fixture: ComponentFixture<AddVideogamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVideogamePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVideogamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
