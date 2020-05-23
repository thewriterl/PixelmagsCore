package com.pixelmags.web.rest;

import com.pixelmags.service.LogService;
import com.pixelmags.web.rest.errors.BadRequestAlertException;
import com.pixelmags.service.dto.LogDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pixelmags.domain.Log}.
 */
@RestController
@RequestMapping("/api")
public class LogResource {

    private final Logger log = LoggerFactory.getLogger(LogResource.class);

    private static final String ENTITY_NAME = "log";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LogService logService;

    public LogResource(LogService logService) {
        this.logService = logService;
    }

    /**
     * {@code POST  /logs} : Create a new log.
     *
     * @param logDTO the logDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new logDTO, or with status {@code 400 (Bad Request)} if the log has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/logs")
    public ResponseEntity<LogDTO> createLog(@RequestBody LogDTO logDTO) throws URISyntaxException {
        log.debug("REST request to save Log : {}", logDTO);
        if (logDTO.getId() != null) {
            throw new BadRequestAlertException("A new log cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LogDTO result = logService.save(logDTO);
        return ResponseEntity.created(new URI("/api/logs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /logs} : Updates an existing log.
     *
     * @param logDTO the logDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated logDTO,
     * or with status {@code 400 (Bad Request)} if the logDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the logDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/logs")
    public ResponseEntity<LogDTO> updateLog(@RequestBody LogDTO logDTO) throws URISyntaxException {
        log.debug("REST request to update Log : {}", logDTO);
        if (logDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LogDTO result = logService.save(logDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, logDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /logs} : get all the logs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of logs in body.
     */
    @GetMapping("/logs")
    public List<LogDTO> getAllLogs() {
        log.debug("REST request to get all Logs");
        return logService.findAll();
    }

    /**
     * {@code GET  /logs/:id} : get the "id" log.
     *
     * @param id the id of the logDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the logDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/logs/{id}")
    public ResponseEntity<LogDTO> getLog(@PathVariable Long id) {
        log.debug("REST request to get Log : {}", id);
        Optional<LogDTO> logDTO = logService.findOne(id);
        return ResponseUtil.wrapOrNotFound(logDTO);
    }

    /**
     * {@code DELETE  /logs/:id} : delete the "id" log.
     *
     * @param id the id of the logDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/logs/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long id) {
        log.debug("REST request to delete Log : {}", id);

        logService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
