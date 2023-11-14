package com.ssafy.cozytrain.api.service;

import com.ssafy.cozytrain.api.dto.HealthDto;
import com.ssafy.cozytrain.api.dto.ReportDto;
import com.ssafy.cozytrain.api.entity.Member;
import com.ssafy.cozytrain.api.entity.Report;

import java.time.LocalDate;
import java.util.Optional;

public interface ReportService {
    Long saveReport(HealthDto.HealthDtoReq healthDto, Member member);
    ReportDto.ReportDtoCommon insertHealthScore(Long reportId);
    Optional<Report> findReportToday(Member member);
    ReportDto.ReportDtoRes getTodayReport(Member member);
    ReportDto.ReportDtoByDate getOneWeekReports(Member member);
    ReportDto.ReportDtoByDate getReportsByDates(Member member, LocalDate startDate, LocalDate endDate);
    ReportDto.ReportDtoCommon getReportByDate(Member member, LocalDate date);
}