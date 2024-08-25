import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLibroUserComponent } from './list-libro-user.component';

describe('ListLibroUserComponent', () => {
  let component: ListLibroUserComponent;
  let fixture: ComponentFixture<ListLibroUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLibroUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListLibroUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
