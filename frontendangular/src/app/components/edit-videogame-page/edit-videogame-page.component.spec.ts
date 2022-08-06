import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVideogamePageComponent } from './edit-videogame-page.component';

describe('EditVideogamePageComponent', () => {
  let component: EditVideogamePageComponent;
  let fixture: ComponentFixture<EditVideogamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVideogamePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVideogamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
