import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollingBannerComponent } from './rolling-banner.component';

describe('RollingBannerComponent', () => {
  let component: RollingBannerComponent;
  let fixture: ComponentFixture<RollingBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollingBannerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RollingBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render banner', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.animate-marquee')).toBeTruthy();
  });
});
