package com.company.asm.transaction.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.company.asm.transaction.service.ReportService;
import com.company.asm.transaction.service.dto.ReportResponseDTO;
import com.company.asm.transaction.service.dto.TransactionReportDTO;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class ReportServiceImpl implements ReportService {

    @Value("${report.template.path}")
    private String reportTemplatePath;  // Usamos la ruta configurada en application.properties

    @Override
    public ReportResponseDTO generateReport(TransactionReportDTO reportData) throws JRException, IOException {
        // Cargar la plantilla .jrxml desde el classpath usando la propiedad configurada
        try (InputStream reportStream = getClass().getResourceAsStream(reportTemplatePath)) {
            if (reportStream == null) {
                throw new JRException("No se pudo encontrar la plantilla del reporte en: " + reportTemplatePath);
            }
            // Compilar el reporte
            JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

            // Mapeamos los parámetros principales que van a la cabecera del reporte
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("customerName", reportData.getCustomerName());
            parameters.put("accountNumber", reportData.getAccountNumber());
            parameters.put("accountType", reportData.getAccountType());
            parameters.put("accountStatus", reportData.getAccountStatus());

            // Crear un JRBeanCollectionDataSource con las transacciones
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(reportData.getTransactions());

            // Llenar el reporte con los parámetros y el datasource
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            // Convertir el reporte a un array de bytes (PDF)
            try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
                JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);

                // Convertir el array de bytes a Base64
                byte[] pdfBytes = outputStream.toByteArray();
                String base64Encoded = Base64.getEncoder().encodeToString(pdfBytes);

                return new ReportResponseDTO("success", "Reporte generado correctamente", base64Encoded);
            }
        }
    }
}
