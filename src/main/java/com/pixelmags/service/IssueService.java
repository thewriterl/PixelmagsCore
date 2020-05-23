package com.pixelmags.service;

import com.pixelmags.domain.Issue;
import com.pixelmags.repository.IssueRepository;
import com.pixelmags.service.dto.IssueDTO;
import com.pixelmags.service.mapper.IssueMapper;
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
 * Service Implementation for managing {@link Issue}.
 */
@Service
@Transactional
public class IssueService {

    private final Logger log = LoggerFactory.getLogger(IssueService.class);

    private final IssueRepository issueRepository;

    private final IssueMapper issueMapper;

    public IssueService(IssueRepository issueRepository, IssueMapper issueMapper) {
        this.issueRepository = issueRepository;
        this.issueMapper = issueMapper;
    }

    /**
     * Save a issue.
     *
     * @param issueDTO the entity to save.
     * @return the persisted entity.
     */
    public IssueDTO save(IssueDTO issueDTO) {
        log.debug("Request to save Issue : {}", issueDTO);
        Issue issue = issueMapper.toEntity(issueDTO);
        issue = issueRepository.save(issue);
        return issueMapper.toDto(issue);
    }

    /**
     * Get all the issues.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<IssueDTO> findAll() {
        log.debug("Request to get all Issues");
        return issueRepository.findAll().stream()
            .map(issueMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }



    /**
     *  Get all the issues where Magazine is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<IssueDTO> findAllWhereMagazineIsNull() {
        log.debug("Request to get all issues where Magazine is null");
        return StreamSupport
            .stream(issueRepository.findAll().spliterator(), false)
            .filter(issue -> issue.getMagazine() == null)
            .map(issueMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one issue by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<IssueDTO> findOne(Long id) {
        log.debug("Request to get Issue : {}", id);
        return issueRepository.findById(id)
            .map(issueMapper::toDto);
    }

    /**
     * Delete the issue by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Issue : {}", id);

        issueRepository.deleteById(id);
    }
}
