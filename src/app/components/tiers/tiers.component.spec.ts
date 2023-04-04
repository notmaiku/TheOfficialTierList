import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiersComponent } from './tiers.component';
import { TierService } from 'src/app/services/tier.service';
import { Tier } from 'src/app/Tier';
import { Color } from 'src/app/Color';
import { TierColorService } from 'src/app/services/tier-color.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { of } from 'rxjs';

describe('TiersComponent', () => {
  let component: TiersComponent;
  let fixture: ComponentFixture<TiersComponent>;
  let tierServiceSpy: jasmine.SpyObj<TierService>;
  let colorServiceSpy: jasmine.SpyObj<TierColorService>;

  beforeEach(async () => {
    const tierServiceSpyObj = jasmine.createSpyObj('TierService', ['deleteTiers', 'addTier']);
    const colorServiceSpyObj = jasmine.createSpyObj('TierColorService', ['getColorData']);
    await TestBed.configureTestingModule({
      declarations: [TiersComponent],
      providers: [
        { provide: TierService, useValue: tierServiceSpyObj },
        { provide: TierColorService, useValue: colorServiceSpyObj },
      ],
    }).compileComponents();
    tierServiceSpy = TestBed.inject(TierService) as jasmine.SpyObj<TierService>;
    colorServiceSpy = TestBed.inject(TierColorService) as jasmine.SpyObj<TierColorService>;
    fixture = TestBed.createComponent(TiersComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the tier data for the given rank on init', () => {
    component.rank = 'A';
    component.tierData = [
      { id: 1, name: 'foo', tier: 'A', column: 0 },
      { id: 2, name: 'bar', tier: 'B', column: 1 },
    ];
    fixture.detectChanges();
    expect(component.tier.length).toBe(1);
    expect(component.tier[0].name).toBe('foo');
  });

  it('should get the color for a given item', () => {
    component.colorData = [
      { name: 'foo', start: '#123', end: '#456' },
      { name: 'bar', start: '#789', end: '#012' },
    ];
    const item = 'foo';
    const result = component.getItemGradient(item);
    expect(result).toEqual(component.colorData[0]);
  });

  it('should return default color if the given item is not found', () => {
    component.colorData = [];
    const item = 'baz';
    const result = component.getItemGradient(item);
    expect(result.name).toBe('default');
    expect(result.start).toBe('transparent');
    expect(result.end).toBe('transparent');
  });

  it('should delete a tier', () => {
    const tierToDelete = { id: 1, name: 'foo', tier: 'A', column: 0 };
    tierServiceSpy.deleteTiers.and.returnValue(of(tierToDelete));
    component.tier = [
      { id: 1, name: 'foo', tier: 'A', column: 0 },
      { id: 2, name: 'bar', tier: 'A', column: 1 },
    ];
    component.deleteTier(tierToDelete);
    expect(t
