package com.pixelmags.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PurchaseMapperTest {

    private PurchaseMapper purchaseMapper;

    @BeforeEach
    public void setUp() {
        purchaseMapper = new PurchaseMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(purchaseMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(purchaseMapper.fromId(null)).isNull();
    }
}
