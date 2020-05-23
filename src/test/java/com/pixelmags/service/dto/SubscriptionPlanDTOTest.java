package com.pixelmags.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pixelmags.web.rest.TestUtil;

public class SubscriptionPlanDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscriptionPlanDTO.class);
        SubscriptionPlanDTO subscriptionPlanDTO1 = new SubscriptionPlanDTO();
        subscriptionPlanDTO1.setId(1L);
        SubscriptionPlanDTO subscriptionPlanDTO2 = new SubscriptionPlanDTO();
        assertThat(subscriptionPlanDTO1).isNotEqualTo(subscriptionPlanDTO2);
        subscriptionPlanDTO2.setId(subscriptionPlanDTO1.getId());
        assertThat(subscriptionPlanDTO1).isEqualTo(subscriptionPlanDTO2);
        subscriptionPlanDTO2.setId(2L);
        assertThat(subscriptionPlanDTO1).isNotEqualTo(subscriptionPlanDTO2);
        subscriptionPlanDTO1.setId(null);
        assertThat(subscriptionPlanDTO1).isNotEqualTo(subscriptionPlanDTO2);
    }
}
