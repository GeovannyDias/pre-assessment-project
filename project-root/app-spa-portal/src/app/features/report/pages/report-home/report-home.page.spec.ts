import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHomePage } from './report-home.page';

describe('ReportHomePage', () => {
  let component: ReportHomePage;
  let fixture: ComponentFixture<ReportHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportHomePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
