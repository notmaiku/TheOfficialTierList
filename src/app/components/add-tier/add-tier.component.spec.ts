import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTierComponent } from './add-tier.component';

describe('AddTierComponent', () => {
  let component: AddTierComponent;
  let fixture: ComponentFixture<AddTierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
