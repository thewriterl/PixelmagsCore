package com.pixelmags.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class SubscriptionPlanMapperTest {

    private SubscriptionPlanMapper subscriptionPlanMapper;

    @BeforeEach
    public void setUp() {
        subscriptionPlanMapper = new SubscriptionPlanMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(subscriptionPlanMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(subscriptionPlanMapper.fromId(null)).isNull();
    }
}
