package com.company.asm.transaction.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.sf.jasperreports.engine.JRException;

import com.company.asm.transaction.service.ReportService;
import com.company.asm.transaction.service.dto.ReportResponseDTO;
import com.company.asm.transaction.service.dto.TransactionReportDTO;

import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @PostMapping("/transactions")
    public ReportResponseDTO generateTransactionReport(@RequestBody TransactionReportDTO reportData) {
        try {
            return reportService.generateReport(reportData);
        } catch (JRException e) {
            return new ReportResponseDTO("error", "Error en la generación del reporte: " + e.getMessage(), null);
        } catch (IOException e) {
            return new ReportResponseDTO("error", "Error de E/S al generar el reporte: " + e.getMessage(), null);
        }
    }

}
