import { TitleCasePipe } from '@angular/common';
import { IAccount } from '../../features/account/models/account.model';

const titleCasePipe = new TitleCasePipe();

export const formatAccountType = (value: string): string => {
    return titleCasePipe.transform(value);
};


export const formatEntityAccountNumber = (value: IAccount): string => {
    return titleCasePipe.transform(value.accountNumber);
};

export const formatEntityAccountType = (value: IAccount): string => {
    return titleCasePipe.transform(value.accountType);
};




