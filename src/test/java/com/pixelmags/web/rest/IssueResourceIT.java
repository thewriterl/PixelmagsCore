package com.pixelmags.web.rest;

import com.pixelmags.PixelmagsCoreApp;
import com.pixelmags.domain.Issue;
import com.pixelmags.repository.IssueRepository;
import com.pixelmags.service.IssueService;
import com.pixelmags.service.dto.IssueDTO;
import com.pixelmags.service.mapper.IssueMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link IssueResource} REST controller.
 */
@SpringBootTest(classes = PixelmagsCoreApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class IssueResourceIT {

    private static final String DEFAULT_EDICAO = "AAAAAAAAAA";
    private static final String UPDATED_EDICAO = "BBBBBBBBBB";

    private static final String DEFAULT_MANCHETE = "AAAAAAAAAA";
    private static final String UPDATED_MANCHETE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_LANCAMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_LANCAMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMERO_PAGINAS = 1;
    private static final Integer UPDATED_NUMERO_PAGINAS = 2;

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final byte[] DEFAULT_COVER_THUMBNAIL = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_COVER_THUMBNAIL = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_COVER_THUMBNAIL_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_COVER_THUMBNAIL_CONTENT_TYPE = "image/png";

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private IssueMapper issueMapper;

    @Autowired
    private IssueService issueService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIssueMockMvc;

    private Issue issue;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Issue createEntity(EntityManager em) {
        Issue issue = new Issue()
            .edicao(DEFAULT_EDICAO)
            .manchete(DEFAULT_MANCHETE)
            .dataLancamento(DEFAULT_DATA_LANCAMENTO)
            .descricao(DEFAULT_DESCRICAO)
            .numeroPaginas(DEFAULT_NUMERO_PAGINAS)
            .url(DEFAULT_URL)
            .coverThumbnail(DEFAULT_COVER_THUMBNAIL)
            .coverThumbnailContentType(DEFAULT_COVER_THUMBNAIL_CONTENT_TYPE);
        return issue;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Issue createUpdatedEntity(EntityManager em) {
        Issue issue = new Issue()
            .edicao(UPDATED_EDICAO)
            .manchete(UPDATED_MANCHETE)
            .dataLancamento(UPDATED_DATA_LANCAMENTO)
            .descricao(UPDATED_DESCRICAO)
            .numeroPaginas(UPDATED_NUMERO_PAGINAS)
            .url(UPDATED_URL)
            .coverThumbnail(UPDATED_COVER_THUMBNAIL)
            .coverThumbnailContentType(UPDATED_COVER_THUMBNAIL_CONTENT_TYPE);
        return issue;
    }

    @BeforeEach
    public void initTest() {
        issue = createEntity(em);
    }

    @Test
    @Transactional
    public void createIssue() throws Exception {
        int databaseSizeBeforeCreate = issueRepository.findAll().size();
        // Create the Issue
        IssueDTO issueDTO = issueMapper.toDto(issue);
        restIssueMockMvc.perform(post("/api/issues")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(issueDTO)))
            .andExpect(status().isCreated());

        // Validate the Issue in the database
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeCreate + 1);
        Issue testIssue = issueList.get(issueList.size() - 1);
        assertThat(testIssue.getEdicao()).isEqualTo(DEFAULT_EDICAO);
        assertThat(testIssue.getManchete()).isEqualTo(DEFAULT_MANCHETE);
        assertThat(testIssue.getDataLancamento()).isEqualTo(DEFAULT_DATA_LANCAMENTO);
        assertThat(testIssue.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testIssue.getNumeroPaginas()).isEqualTo(DEFAULT_NUMERO_PAGINAS);
        assertThat(testIssue.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testIssue.getCoverThumbnail()).isEqualTo(DEFAULT_COVER_THUMBNAIL);
        assertThat(testIssue.getCoverThumbnailContentType()).isEqualTo(DEFAULT_COVER_THUMBNAIL_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createIssueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = issueRepository.findAll().size();

        // Create the Issue with an existing ID
        issue.setId(1L);
        IssueDTO issueDTO = issueMapper.toDto(issue);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIssueMockMvc.perform(post("/api/issues")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(issueDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Issue in the database
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllIssues() throws Exception {
        // Initialize the database
        issueRepository.saveAndFlush(issue);

        // Get all the issueList
        restIssueMockMvc.perform(get("/api/issues?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(issue.getId().intValue())))
            .andExpect(jsonPath("$.[*].edicao").value(hasItem(DEFAULT_EDICAO)))
            .andExpect(jsonPath("$.[*].manchete").value(hasItem(DEFAULT_MANCHETE)))
            .andExpect(jsonPath("$.[*].dataLancamento").value(hasItem(DEFAULT_DATA_LANCAMENTO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].numeroPaginas").value(hasItem(DEFAULT_NUMERO_PAGINAS)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].coverThumbnailContentType").value(hasItem(DEFAULT_COVER_THUMBNAIL_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].coverThumbnail").value(hasItem(Base64Utils.encodeToString(DEFAULT_COVER_THUMBNAIL))));
    }
    
    @Test
    @Transactional
    public void getIssue() throws Exception {
        // Initialize the database
        issueRepository.saveAndFlush(issue);

        // Get the issue
        restIssueMockMvc.perform(get("/api/issues/{id}", issue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(issue.getId().intValue()))
            .andExpect(jsonPath("$.edicao").value(DEFAULT_EDICAO))
            .andExpect(jsonPath("$.manchete").value(DEFAULT_MANCHETE))
            .andExpect(jsonPath("$.dataLancamento").value(DEFAULT_DATA_LANCAMENTO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.numeroPaginas").value(DEFAULT_NUMERO_PAGINAS))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.coverThumbnailContentType").value(DEFAULT_COVER_THUMBNAIL_CONTENT_TYPE))
            .andExpect(jsonPath("$.coverThumbnail").value(Base64Utils.encodeToString(DEFAULT_COVER_THUMBNAIL)));
    }
    @Test
    @Transactional
    public void getNonExistingIssue() throws Exception {
        // Get the issue
        restIssueMockMvc.perform(get("/api/issues/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIssue() throws Exception {
        // Initialize the database
        issueRepository.saveAndFlush(issue);

        int databaseSizeBeforeUpdate = issueRepository.findAll().size();

        // Update the issue
        Issue updatedIssue = issueRepository.findById(issue.getId()).get();
        // Disconnect from session so that the updates on updatedIssue are not directly saved in db
        em.detach(updatedIssue);
        updatedIssue
            .edicao(UPDATED_EDICAO)
            .manchete(UPDATED_MANCHETE)
            .dataLancamento(UPDATED_DATA_LANCAMENTO)
            .descricao(UPDATED_DESCRICAO)
            .numeroPaginas(UPDATED_NUMERO_PAGINAS)
            .url(UPDATED_URL)
            .coverThumbnail(UPDATED_COVER_THUMBNAIL)
            .coverThumbnailContentType(UPDATED_COVER_THUMBNAIL_CONTENT_TYPE);
        IssueDTO issueDTO = issueMapper.toDto(updatedIssue);

        restIssueMockMvc.perform(put("/api/issues")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(issueDTO)))
            .andExpect(status().isOk());

        // Validate the Issue in the database
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeUpdate);
        Issue testIssue = issueList.get(issueList.size() - 1);
        assertThat(testIssue.getEdicao()).isEqualTo(UPDATED_EDICAO);
        assertThat(testIssue.getManchete()).isEqualTo(UPDATED_MANCHETE);
        assertThat(testIssue.getDataLancamento()).isEqualTo(UPDATED_DATA_LANCAMENTO);
        assertThat(testIssue.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testIssue.getNumeroPaginas()).isEqualTo(UPDATED_NUMERO_PAGINAS);
        assertThat(testIssue.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testIssue.getCoverThumbnail()).isEqualTo(UPDATED_COVER_THUMBNAIL);
        assertThat(testIssue.getCoverThumbnailContentType()).isEqualTo(UPDATED_COVER_THUMBNAIL_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingIssue() throws Exception {
        int databaseSizeBeforeUpdate = issueRepository.findAll().size();

        // Create the Issue
        IssueDTO issueDTO = issueMapper.toDto(issue);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIssueMockMvc.perform(put("/api/issues")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(issueDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Issue in the database
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIssue() throws Exception {
        // Initialize the database
        issueRepository.saveAndFlush(issue);

        int databaseSizeBeforeDelete = issueRepository.findAll().size();

        // Delete the issue
        restIssueMockMvc.perform(delete("/api/issues/{id}", issue.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
