package com.pixelmags.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class LogMapperTest {

    private LogMapper logMapper;

    @BeforeEach
    public void setUp() {
        logMapper = new LogMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(logMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(logMapper.fromId(null)).isNull();
    }
}
