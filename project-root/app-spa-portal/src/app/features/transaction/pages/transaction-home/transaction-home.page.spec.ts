import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHomePage } from './transaction-home.page';

describe('TransactionHomePage', () => {
  let component: TransactionHomePage;
  let fixture: ComponentFixture<TransactionHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionHomePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
