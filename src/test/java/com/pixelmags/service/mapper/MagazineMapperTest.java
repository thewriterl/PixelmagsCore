package com.pixelmags.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class MagazineMapperTest {

    private MagazineMapper magazineMapper;

    @BeforeEach
    public void setUp() {
        magazineMapper = new MagazineMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(magazineMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(magazineMapper.fromId(null)).isNull();
    }
}
