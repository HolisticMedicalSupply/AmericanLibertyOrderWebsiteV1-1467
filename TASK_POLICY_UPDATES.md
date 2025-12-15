# Task Guide: Policy Platform Content Updates

This document provides guidance for agents updating or creating policy content for the American Liberty Order website.

## Overview

The website displays policy positions from `src/data/policy-data.json`. The authoritative source document is `alo_policy_platform_v2(1).html`, which contains the complete, detailed policy platform with 16 pillars.

**Goal:** Keep the website's JSON data synchronized with the HTML source document, ensuring all policy details, framing, and metadata are accurately represented.

---

## Source Document Structure

### Location
`alo_policy_platform_v2(1).html` - HTML document with detailed policy content

### HTML Structure Pattern
```html
<div class="policy-category">
    <div class="category-header">
        <h2>Section Title</h2>
        <p>Section subtitle/description</p>
        <div class="category-badge">X Focus Areas</div>
    </div>
    <div class="category-body">
        <div class="category-intro">Section introduction text</div>

        <!-- Each sub-policy -->
        <div class="policy-item">
            <div class="policy-header">
                <div class="policy-title">X.X Sub-Policy Title</div>
                <div class="viability-badge [high|mod-high|moderate|low]">Viability Label</div>
            </div>

            <div class="problem-box">
                <h4>⚠️ The Problem</h4>
                <ul><li>Problem points...</li></ul>
            </div>

            <div class="positions-box">
                <h4>📋 Policy Positions</h4>
                <ul><li>Position points...</li></ul>
            </div>

            <div class="framing-box">
                <h4>🎯 Strategic Framing</h4>
                <p><strong>For conservatives:</strong> ...</p>
                <p><strong>For progressives:</strong> ...</p>
                <p><strong>For everyone:</strong> ...</p>
            </div>

            <div class="assessment-grid">
                <div class="assessment-item">
                    <div class="label">Level</div>
                    Federal/State jurisdiction info
                </div>
                <div class="assessment-item">
                    <div class="label">Opposition</div>
                    Opposition groups
                </div>
                <div class="assessment-item">
                    <div class="label">Allies</div>
                    Allied groups
                </div>
            </div>
        </div>
    </div>
</div>
```

---

## Target Data Structure

### Location
`src/data/policy-data.json`

### JSON Schema
```json
{
  "policies": [
    {
      "id": "kebab-case-id",
      "slug": "kebab-case-slug",
      "title": "Policy Pillar Title",
      "icon": "IconName",
      "color": "#HexColor",
      "description": "Section introduction from category-intro",
      "subPolicies": [
        {
          "title": "Sub-Policy Title",
          "viability": "high|mod-high|moderate|low|low-mod",
          "level": "Federal|State|Both with details",
          "problem": [
            "Problem statement 1",
            "Problem statement 2"
          ],
          "positions": [
            "Policy position 1",
            "Policy position 2"
          ],
          "framing": {
            "forConservatives": "Conservative framing message",
            "forProgressives": "Progressive framing message",
            "forEveryone": "Universal framing message",
            "forFarmers": "Optional: farmer-specific framing",
            "forParents": "Optional: parent-specific framing"
          },
          "allies": "Comma-separated list of allied groups",
          "opposition": "Comma-separated list of opposition groups",
          "currentStatus": "Optional: current legal/implementation status",
          "modelLegislation": "Optional: reference to model legislation"
        }
      ]
    }
  ]
}
```

---

## Field Mapping Reference

| HTML Source | JSON Target | Notes |
|-------------|-------------|-------|
| `<h2>` in category-header | `title` | Main pillar title |
| `.category-intro` text | `description` | Section introduction |
| `.policy-title` | `subPolicies[].title` | Remove section number prefix (e.g., "2.1") |
| `.viability-badge` class | `subPolicies[].viability` | Map: high, mod-high, moderate, low-mod, low |
| `.problem-box ul li` | `subPolicies[].problem[]` | Array of problem statements |
| `.positions-box ul li` | `subPolicies[].positions[]` | Array of policy positions |
| `.framing-box p` | `subPolicies[].framing{}` | Object with audience-specific keys |
| Assessment grid "Level" | `subPolicies[].level` | Jurisdiction information |
| Assessment grid "Allies" | `subPolicies[].allies` | String of allied groups |
| Assessment grid "Opposition" | `subPolicies[].opposition` | String of opposition groups |
| `.alert` boxes | Various optional fields | `currentStatus`, `modelLegislation`, etc. |

### Viability Mapping
| HTML Badge Text | JSON Value |
|-----------------|------------|
| "High Viability" | `"high"` |
| "Moderate-High Viability" | `"mod-high"` |
| "Moderate Viability" | `"moderate"` |
| "Low-Moderate Viability" | `"low-mod"` |
| "Low Viability" | `"low"` |

---

## Update Process

### Recommended Chunking Strategy

Update one policy pillar (section) at a time. The 16 pillars are:

| Chunk | Section | Sub-policies |
|-------|---------|--------------|
| 1 | Economic Freedom & Anti-Cronyism | 7 |
| 2 | Food & Health Sovereignty | 4 |
| 3 | Property Rights | 3 |
| 4 | Government Accountability & Reform | 6 |
| 5 | Election Integrity | 5 |
| 6 | Constitutional Rights | 7 |
| 7 | Technology & Communications Freedom | 3 |
| 8 | Monetary & Financial Reform | 5 |
| 9 | Political System Reform | 3 |
| 10 | Foreign Policy & National Interest | 4 |
| 11 | Healthcare System Reform | 3 |
| 12 | Education Reform | 3 |
| 13 | Social Security Reform | 1 |
| 14 | Tax Reform | 4 |
| 15 | Drug Policy Reform | 3 |
| 16 | Housing Reform | 4 |

### Step-by-Step Process

1. **Read the current JSON** to understand existing structure
   ```
   Read src/data/policy-data.json
   ```

2. **Find the section in HTML source** using Grep
   ```
   Grep for "Section X: [Name]" in alo_policy_platform_v2(1).html
   ```

3. **Read the HTML section** starting from the line found
   ```
   Read alo_policy_platform_v2(1).html with offset at section start
   ```

4. **Extract and map content** following the field mapping above

5. **Update the JSON** using Edit tool - replace the entire policy object
   ```
   Edit the section from opening { to closing }, (including trailing comma if not last)
   ```

6. **Commit the change** with descriptive message
   ```bash
   git add -A && git commit -m "Update [Section Name] with comprehensive policy content"
   ```

7. **Push to remote branch**
   ```bash
   git push -u origin [branch-name]
   ```

---

## Best Practices

### Content Extraction
- **Preserve exact wording** from the HTML source where possible
- **Combine multiple positions-box sections** into a single positions array
- **Include all framing variations** - some sections have audience-specific framing (farmers, parents, etc.)
- **Capture special fields** like `currentStatus` or `modelLegislation` from alert boxes

### JSON Formatting
- **Use consistent viability values** - always lowercase, hyphenated (e.g., `mod-high`)
- **Keep framing as an object** with camelCase keys (`forConservatives`, not `for conservatives`)
- **Allies and opposition are strings**, not arrays
- **Problem and positions are arrays** of strings

### Quality Checks
- Verify sub-policy count matches HTML source
- Ensure all problem statements are captured
- Ensure all policy positions are captured
- Check that framing covers all audiences mentioned in source
- Verify level/jurisdiction information is included

### Commit Messages
Use this format:
```
Update [Section Name] section with comprehensive policy content

Chunk X of 16: Updated [Section Name] section with detailed
policy content from alo_policy_platform_v2(1).html source document.

Changes include:
- [Key change 1]
- [Key change 2]
- Added NEW "[sub-policy name]" sub-policy (if applicable)
```

---

## Example: Updating a Section

### Before (placeholder content)
```json
{
  "title": "Example Policy",
  "viability": "moderate",
  "problem": [
    "Generic problem 1",
    "Generic problem 2"
  ],
  "positions": [
    "Generic position 1"
  ],
  "framing": "Simple framing string"
}
```

### After (comprehensive content)
```json
{
  "title": "Example Policy Reform",
  "viability": "mod-high",
  "level": "State (primary), Federal (supporting)",
  "problem": [
    "Specific problem with data points",
    "Another specific issue with examples",
    "Third problem affecting specific groups"
  ],
  "positions": [
    "Specific policy: Detailed description of what this means",
    "Another policy: With implementation details",
    "Third policy: Including scope and limitations"
  ],
  "framing": {
    "forConservatives": "Conservative-appealing framing",
    "forProgressives": "Progressive-appealing framing",
    "forEveryone": "Universal appeal framing"
  },
  "allies": "Group 1, Group 2, Organization 3",
  "opposition": "Opposition group 1, Opposition group 2"
}
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| JSON syntax errors after edit | Validate JSON, check for missing commas or quotes |
| Missing sub-policies | Re-read HTML source, some sections have multiple positions-box elements |
| Framing structure mismatch | Old format was string, new format is object - update accordingly |
| Wrong viability value | Check HTML badge class, map to correct lowercase value |

### Validation
After updating, the JSON should:
- Parse without errors
- Have matching sub-policy counts to HTML source
- Include all required fields (`title`, `viability`, `problem`, `positions`)
- Have consistent structure across all entries

---

## Related Files

| File | Purpose |
|------|---------|
| `src/data/policy-data.json` | Target data file for website |
| `alo_policy_platform_v2(1).html` | Source document with complete content |
| `claude.md` | Project overview and structure |
| `src/pages/Policies.tsx` | Frontend component rendering policies |
| `src/pages/PolicyDetail.tsx` | Individual policy page component |

---

## Version History

| Date | Changes |
|------|---------|
| 2025-12-15 | Initial document creation |
| 2025-12-15 | Chunks 1-2 completed (Economic Freedom, Food & Health) |
