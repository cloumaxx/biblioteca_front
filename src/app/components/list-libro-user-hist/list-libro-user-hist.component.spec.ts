import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLibroUserHistComponent } from './list-libro-user-hist.component';

describe('ListLibroUserHistComponent', () => {
  let component: ListLibroUserHistComponent;
  let fixture: ComponentFixture<ListLibroUserHistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLibroUserHistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListLibroUserHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
