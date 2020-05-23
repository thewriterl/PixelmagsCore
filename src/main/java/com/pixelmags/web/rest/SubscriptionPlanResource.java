package com.pixelmags.web.rest;

import com.pixelmags.service.SubscriptionPlanService;
import com.pixelmags.web.rest.errors.BadRequestAlertException;
import com.pixelmags.service.dto.SubscriptionPlanDTO;

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
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.pixelmags.domain.SubscriptionPlan}.
 */
@RestController
@RequestMapping("/api")
public class SubscriptionPlanResource {

    private final Logger log = LoggerFactory.getLogger(SubscriptionPlanResource.class);

    private static final String ENTITY_NAME = "subscriptionPlan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubscriptionPlanService subscriptionPlanService;

    public SubscriptionPlanResource(SubscriptionPlanService subscriptionPlanService) {
        this.subscriptionPlanService = subscriptionPlanService;
    }

    /**
     * {@code POST  /subscription-plans} : Create a new subscriptionPlan.
     *
     * @param subscriptionPlanDTO the subscriptionPlanDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subscriptionPlanDTO, or with status {@code 400 (Bad Request)} if the subscriptionPlan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subscription-plans")
    public ResponseEntity<SubscriptionPlanDTO> createSubscriptionPlan(@RequestBody SubscriptionPlanDTO subscriptionPlanDTO) throws URISyntaxException {
        log.debug("REST request to save SubscriptionPlan : {}", subscriptionPlanDTO);
        if (subscriptionPlanDTO.getId() != null) {
            throw new BadRequestAlertException("A new subscriptionPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubscriptionPlanDTO result = subscriptionPlanService.save(subscriptionPlanDTO);
        return ResponseEntity.created(new URI("/api/subscription-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subscription-plans} : Updates an existing subscriptionPlan.
     *
     * @param subscriptionPlanDTO the subscriptionPlanDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subscriptionPlanDTO,
     * or with status {@code 400 (Bad Request)} if the subscriptionPlanDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subscriptionPlanDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subscription-plans")
    public ResponseEntity<SubscriptionPlanDTO> updateSubscriptionPlan(@RequestBody SubscriptionPlanDTO subscriptionPlanDTO) throws URISyntaxException {
        log.debug("REST request to update SubscriptionPlan : {}", subscriptionPlanDTO);
        if (subscriptionPlanDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubscriptionPlanDTO result = subscriptionPlanService.save(subscriptionPlanDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, subscriptionPlanDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subscription-plans} : get all the subscriptionPlans.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subscriptionPlans in body.
     */
    @GetMapping("/subscription-plans")
    public List<SubscriptionPlanDTO> getAllSubscriptionPlans(@RequestParam(required = false) String filter) {
        if ("purchase-is-null".equals(filter)) {
            log.debug("REST request to get all SubscriptionPlans where purchase is null");
            return subscriptionPlanService.findAllWherePurchaseIsNull();
        }
        log.debug("REST request to get all SubscriptionPlans");
        return subscriptionPlanService.findAll();
    }

    /**
     * {@code GET  /subscription-plans/:id} : get the "id" subscriptionPlan.
     *
     * @param id the id of the subscriptionPlanDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subscriptionPlanDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subscription-plans/{id}")
    public ResponseEntity<SubscriptionPlanDTO> getSubscriptionPlan(@PathVariable Long id) {
        log.debug("REST request to get SubscriptionPlan : {}", id);
        Optional<SubscriptionPlanDTO> subscriptionPlanDTO = subscriptionPlanService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subscriptionPlanDTO);
    }

    /**
     * {@code DELETE  /subscription-plans/:id} : delete the "id" subscriptionPlan.
     *
     * @param id the id of the subscriptionPlanDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subscription-plans/{id}")
    public ResponseEntity<Void> deleteSubscriptionPlan(@PathVariable Long id) {
        log.debug("REST request to delete SubscriptionPlan : {}", id);

        subscriptionPlanService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
