package com.company.asm.transaction.service;

import com.company.asm.transaction.service.dto.ReportResponseDTO;
import com.company.asm.transaction.service.dto.TransactionReportDTO;

import java.io.IOException;
import net.sf.jasperreports.engine.JRException;

public interface ReportService {
    ReportResponseDTO generateReport(TransactionReportDTO reportData) throws JRException, IOException;
}
