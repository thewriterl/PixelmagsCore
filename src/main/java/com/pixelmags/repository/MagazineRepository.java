package com.pixelmags.repository;

import com.pixelmags.domain.Magazine;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Magazine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MagazineRepository extends JpaRepository<Magazine, Long> {
}
