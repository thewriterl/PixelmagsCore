package com.pixelmags.web.rest;

import com.pixelmags.PixelmagsCoreApp;
import com.pixelmags.domain.SubscriptionPlan;
import com.pixelmags.repository.SubscriptionPlanRepository;
import com.pixelmags.service.SubscriptionPlanService;
import com.pixelmags.service.dto.SubscriptionPlanDTO;
import com.pixelmags.service.mapper.SubscriptionPlanMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pixelmags.domain.enumeration.SubscriptionPeriod;
/**
 * Integration tests for the {@link SubscriptionPlanResource} REST controller.
 */
@SpringBootTest(classes = PixelmagsCoreApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SubscriptionPlanResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRECO = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRECO = new BigDecimal(2);

    private static final SubscriptionPeriod DEFAULT_PERIODO = SubscriptionPeriod.DIARIO;
    private static final SubscriptionPeriod UPDATED_PERIODO = SubscriptionPeriod.SEMANAL;

    @Autowired
    private SubscriptionPlanRepository subscriptionPlanRepository;

    @Autowired
    private SubscriptionPlanMapper subscriptionPlanMapper;

    @Autowired
    private SubscriptionPlanService subscriptionPlanService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubscriptionPlanMockMvc;

    private SubscriptionPlan subscriptionPlan;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubscriptionPlan createEntity(EntityManager em) {
        SubscriptionPlan subscriptionPlan = new SubscriptionPlan()
            .nome(DEFAULT_NOME)
            .preco(DEFAULT_PRECO)
            .periodo(DEFAULT_PERIODO);
        return subscriptionPlan;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubscriptionPlan createUpdatedEntity(EntityManager em) {
        SubscriptionPlan subscriptionPlan = new SubscriptionPlan()
            .nome(UPDATED_NOME)
            .preco(UPDATED_PRECO)
            .periodo(UPDATED_PERIODO);
        return subscriptionPlan;
    }

    @BeforeEach
    public void initTest() {
        subscriptionPlan = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubscriptionPlan() throws Exception {
        int databaseSizeBeforeCreate = subscriptionPlanRepository.findAll().size();
        // Create the SubscriptionPlan
        SubscriptionPlanDTO subscriptionPlanDTO = subscriptionPlanMapper.toDto(subscriptionPlan);
        restSubscriptionPlanMockMvc.perform(post("/api/subscription-plans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPlanDTO)))
            .andExpect(status().isCreated());

        // Validate the SubscriptionPlan in the database
        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeCreate + 1);
        SubscriptionPlan testSubscriptionPlan = subscriptionPlanList.get(subscriptionPlanList.size() - 1);
        assertThat(testSubscriptionPlan.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testSubscriptionPlan.getPreco()).isEqualTo(DEFAULT_PRECO);
        assertThat(testSubscriptionPlan.getPeriodo()).isEqualTo(DEFAULT_PERIODO);
    }

    @Test
    @Transactional
    public void createSubscriptionPlanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscriptionPlanRepository.findAll().size();

        // Create the SubscriptionPlan with an existing ID
        subscriptionPlan.setId(1L);
        SubscriptionPlanDTO subscriptionPlanDTO = subscriptionPlanMapper.toDto(subscriptionPlan);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscriptionPlanMockMvc.perform(post("/api/subscription-plans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPlanDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubscriptionPlan in the database
        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSubscriptionPlans() throws Exception {
        // Initialize the database
        subscriptionPlanRepository.saveAndFlush(subscriptionPlan);

        // Get all the subscriptionPlanList
        restSubscriptionPlanMockMvc.perform(get("/api/subscription-plans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriptionPlan.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].preco").value(hasItem(DEFAULT_PRECO.intValue())))
            .andExpect(jsonPath("$.[*].periodo").value(hasItem(DEFAULT_PERIODO.toString())));
    }
    
    @Test
    @Transactional
    public void getSubscriptionPlan() throws Exception {
        // Initialize the database
        subscriptionPlanRepository.saveAndFlush(subscriptionPlan);

        // Get the subscriptionPlan
        restSubscriptionPlanMockMvc.perform(get("/api/subscription-plans/{id}", subscriptionPlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subscriptionPlan.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.preco").value(DEFAULT_PRECO.intValue()))
            .andExpect(jsonPath("$.periodo").value(DEFAULT_PERIODO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSubscriptionPlan() throws Exception {
        // Get the subscriptionPlan
        restSubscriptionPlanMockMvc.perform(get("/api/subscription-plans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscriptionPlan() throws Exception {
        // Initialize the database
        subscriptionPlanRepository.saveAndFlush(subscriptionPlan);

        int databaseSizeBeforeUpdate = subscriptionPlanRepository.findAll().size();

        // Update the subscriptionPlan
        SubscriptionPlan updatedSubscriptionPlan = subscriptionPlanRepository.findById(subscriptionPlan.getId()).get();
        // Disconnect from session so that the updates on updatedSubscriptionPlan are not directly saved in db
        em.detach(updatedSubscriptionPlan);
        updatedSubscriptionPlan
            .nome(UPDATED_NOME)
            .preco(UPDATED_PRECO)
            .periodo(UPDATED_PERIODO);
        SubscriptionPlanDTO subscriptionPlanDTO = subscriptionPlanMapper.toDto(updatedSubscriptionPlan);

        restSubscriptionPlanMockMvc.perform(put("/api/subscription-plans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPlanDTO)))
            .andExpect(status().isOk());

        // Validate the SubscriptionPlan in the database
        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeUpdate);
        SubscriptionPlan testSubscriptionPlan = subscriptionPlanList.get(subscriptionPlanList.size() - 1);
        assertThat(testSubscriptionPlan.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testSubscriptionPlan.getPreco()).isEqualTo(UPDATED_PRECO);
        assertThat(testSubscriptionPlan.getPeriodo()).isEqualTo(UPDATED_PERIODO);
    }

    @Test
    @Transactional
    public void updateNonExistingSubscriptionPlan() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionPlanRepository.findAll().size();

        // Create the SubscriptionPlan
        SubscriptionPlanDTO subscriptionPlanDTO = subscriptionPlanMapper.toDto(subscriptionPlan);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscriptionPlanMockMvc.perform(put("/api/subscription-plans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPlanDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubscriptionPlan in the database
        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubscriptionPlan() throws Exception {
        // Initialize the database
        subscriptionPlanRepository.saveAndFlush(subscriptionPlan);

        int databaseSizeBeforeDelete = subscriptionPlanRepository.findAll().size();

        // Delete the subscriptionPlan
        restSubscriptionPlanMockMvc.perform(delete("/api/subscription-plans/{id}", subscriptionPlan.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubscriptionPlan> subscriptionPlanList = subscriptionPlanRepository.findAll();
        assertThat(subscriptionPlanList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
