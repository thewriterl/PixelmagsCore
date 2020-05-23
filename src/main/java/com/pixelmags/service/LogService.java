package com.pixelmags.service;

import com.pixelmags.domain.Log;
import com.pixelmags.repository.LogRepository;
import com.pixelmags.service.dto.LogDTO;
import com.pixelmags.service.mapper.LogMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Log}.
 */
@Service
@Transactional
public class LogService {

    private final Logger log = LoggerFactory.getLogger(LogService.class);

    private final LogRepository logRepository;

    private final LogMapper logMapper;

    public LogService(LogRepository logRepository, LogMapper logMapper) {
        this.logRepository = logRepository;
        this.logMapper = logMapper;
    }

    /**
     * Save a log.
     *
     * @param logDTO the entity to save.
     * @return the persisted entity.
     */
    public LogDTO save(LogDTO logDTO) {
        log.debug("Request to save Log : {}", logDTO);
        Log log = logMapper.toEntity(logDTO);
        log = logRepository.save(log);
        return logMapper.toDto(log);
    }

    /**
     * Get all the logs.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LogDTO> findAll() {
        log.debug("Request to get all Logs");
        return logRepository.findAll().stream()
            .map(logMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one log by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LogDTO> findOne(Long id) {
        log.debug("Request to get Log : {}", id);
        return logRepository.findById(id)
            .map(logMapper::toDto);
    }

    /**
     * Delete the log by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Log : {}", id);

        logRepository.deleteById(id);
    }
}
