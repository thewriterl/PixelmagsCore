package com.pixelmags.service;

import com.pixelmags.domain.Purchase;
import com.pixelmags.repository.PurchaseRepository;
import com.pixelmags.service.dto.PurchaseDTO;
import com.pixelmags.service.mapper.PurchaseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Purchase}.
 */
@Service
@Transactional
public class PurchaseService {

    private final Logger log = LoggerFactory.getLogger(PurchaseService.class);

    private final PurchaseRepository purchaseRepository;

    private final PurchaseMapper purchaseMapper;

    public PurchaseService(PurchaseRepository purchaseRepository, PurchaseMapper purchaseMapper) {
        this.purchaseRepository = purchaseRepository;
        this.purchaseMapper = purchaseMapper;
    }

    /**
     * Save a purchase.
     *
     * @param purchaseDTO the entity to save.
     * @return the persisted entity.
     */
    public PurchaseDTO save(PurchaseDTO purchaseDTO) {
        log.debug("Request to save Purchase : {}", purchaseDTO);
        Purchase purchase = purchaseMapper.toEntity(purchaseDTO);
        purchase = purchaseRepository.save(purchase);
        return purchaseMapper.toDto(purchase);
    }

    /**
     * Get all the purchases.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PurchaseDTO> findAll() {
        log.debug("Request to get all Purchases");
        return purchaseRepository.findAll().stream()
            .map(purchaseMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }



    /**
     *  Get all the purchases where Magazine is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<PurchaseDTO> findAllWhereMagazineIsNull() {
        log.debug("Request to get all purchases where Magazine is null");
        return StreamSupport
            .stream(purchaseRepository.findAll().spliterator(), false)
            .filter(purchase -> purchase.getMagazine() == null)
            .map(purchaseMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one purchase by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PurchaseDTO> findOne(Long id) {
        log.debug("Request to get Purchase : {}", id);
        return purchaseRepository.findById(id)
            .map(purchaseMapper::toDto);
    }

    /**
     * Delete the purchase by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Purchase : {}", id);

        purchaseRepository.deleteById(id);
    }
}
