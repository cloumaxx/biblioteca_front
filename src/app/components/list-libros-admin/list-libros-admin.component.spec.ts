import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLibrosAdminComponent } from './list-libros-admin.component';

describe('ListLibrosAdminComponent', () => {
  let component: ListLibrosAdminComponent;
  let fixture: ComponentFixture<ListLibrosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLibrosAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListLibrosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
