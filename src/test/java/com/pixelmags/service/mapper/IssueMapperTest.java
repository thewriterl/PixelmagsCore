package com.pixelmags.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class IssueMapperTest {

    private IssueMapper issueMapper;

    @BeforeEach
    public void setUp() {
        issueMapper = new IssueMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(issueMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(issueMapper.fromId(null)).isNull();
    }
}
