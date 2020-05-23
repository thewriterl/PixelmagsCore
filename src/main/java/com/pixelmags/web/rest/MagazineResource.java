package com.pixelmags.web.rest;

import com.pixelmags.service.MagazineService;
import com.pixelmags.web.rest.errors.BadRequestAlertException;
import com.pixelmags.service.dto.MagazineDTO;

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
 * REST controller for managing {@link com.pixelmags.domain.Magazine}.
 */
@RestController
@RequestMapping("/api")
public class MagazineResource {

    private final Logger log = LoggerFactory.getLogger(MagazineResource.class);

    private static final String ENTITY_NAME = "magazine";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MagazineService magazineService;

    public MagazineResource(MagazineService magazineService) {
        this.magazineService = magazineService;
    }

    /**
     * {@code POST  /magazines} : Create a new magazine.
     *
     * @param magazineDTO the magazineDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new magazineDTO, or with status {@code 400 (Bad Request)} if the magazine has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/magazines")
    public ResponseEntity<MagazineDTO> createMagazine(@RequestBody MagazineDTO magazineDTO) throws URISyntaxException {
        log.debug("REST request to save Magazine : {}", magazineDTO);
        if (magazineDTO.getId() != null) {
            throw new BadRequestAlertException("A new magazine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MagazineDTO result = magazineService.save(magazineDTO);
        return ResponseEntity.created(new URI("/api/magazines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /magazines} : Updates an existing magazine.
     *
     * @param magazineDTO the magazineDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated magazineDTO,
     * or with status {@code 400 (Bad Request)} if the magazineDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the magazineDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/magazines")
    public ResponseEntity<MagazineDTO> updateMagazine(@RequestBody MagazineDTO magazineDTO) throws URISyntaxException {
        log.debug("REST request to update Magazine : {}", magazineDTO);
        if (magazineDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MagazineDTO result = magazineService.save(magazineDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, magazineDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /magazines} : get all the magazines.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of magazines in body.
     */
    @GetMapping("/magazines")
    public List<MagazineDTO> getAllMagazines() {
        log.debug("REST request to get all Magazines");
        return magazineService.findAll();
    }

    /**
     * {@code GET  /magazines/:id} : get the "id" magazine.
     *
     * @param id the id of the magazineDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the magazineDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/magazines/{id}")
    public ResponseEntity<MagazineDTO> getMagazine(@PathVariable Long id) {
        log.debug("REST request to get Magazine : {}", id);
        Optional<MagazineDTO> magazineDTO = magazineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(magazineDTO);
    }

    /**
     * {@code DELETE  /magazines/:id} : delete the "id" magazine.
     *
     * @param id the id of the magazineDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/magazines/{id}")
    public ResponseEntity<Void> deleteMagazine(@PathVariable Long id) {
        log.debug("REST request to delete Magazine : {}", id);

        magazineService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
