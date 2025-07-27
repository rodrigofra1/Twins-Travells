import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelsListPage } from './travels-list.page';

describe('TravelsListPage', () => {
  let component: TravelsListPage;
  let fixture: ComponentFixture<TravelsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
