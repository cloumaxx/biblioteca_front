import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLibroUserPosComponent } from './list-libro-user-pos.component';

describe('ListLibroUserPosComponent', () => {
  let component: ListLibroUserPosComponent;
  let fixture: ComponentFixture<ListLibroUserPosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLibroUserPosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListLibroUserPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
