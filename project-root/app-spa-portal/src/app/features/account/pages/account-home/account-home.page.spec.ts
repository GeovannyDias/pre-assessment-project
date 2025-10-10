import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHomePage } from './account-home.page';

describe('AccountHomePage', () => {
  let component: AccountHomePage;
  let fixture: ComponentFixture<AccountHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountHomePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
