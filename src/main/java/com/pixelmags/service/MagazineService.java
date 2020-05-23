package com.pixelmags.service;

import com.pixelmags.domain.Magazine;
import com.pixelmags.repository.MagazineRepository;
import com.pixelmags.service.dto.MagazineDTO;
import com.pixelmags.service.mapper.MagazineMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Magazine}.
 */
@Service
@Transactional
public class MagazineService {

    private final Logger log = LoggerFactory.getLogger(MagazineService.class);

    private final MagazineRepository magazineRepository;

    private final MagazineMapper magazineMapper;

    public MagazineService(MagazineRepository magazineRepository, MagazineMapper magazineMapper) {
        this.magazineRepository = magazineRepository;
        this.magazineMapper = magazineMapper;
    }

    /**
     * Save a magazine.
     *
     * @param magazineDTO the entity to save.
     * @return the persisted entity.
     */
    public MagazineDTO save(MagazineDTO magazineDTO) {
        log.debug("Request to save Magazine : {}", magazineDTO);
        Magazine magazine = magazineMapper.toEntity(magazineDTO);
        magazine = magazineRepository.save(magazine);
        return magazineMapper.toDto(magazine);
    }

    /**
     * Get all the magazines.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<MagazineDTO> findAll() {
        log.debug("Request to get all Magazines");
        return magazineRepository.findAll().stream()
            .map(magazineMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one magazine by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<MagazineDTO> findOne(Long id) {
        log.debug("Request to get Magazine : {}", id);
        return magazineRepository.findById(id)
            .map(magazineMapper::toDto);
    }

    /**
     * Delete the magazine by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Magazine : {}", id);

        magazineRepository.deleteById(id);
    }
}
