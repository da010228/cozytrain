package song.sam.cozytrain.ui.component

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import song.sam.cozytrain.ui.theme.BienestarEmocionalTheme
import song.sam.cozytrain.utils.formatDateTime
import java.time.Instant
import java.time.ZoneOffset

/**
 * Display DD/MM/YYYY and start and end date in text
 * @param start: Instant with the start date
 * @param startZoneOffset: ZoneOffset of the start date
 * @param end: Instant with the end date
 * @param endZoneOffset: ZoneOffset of the end date
 */
fun LazyListScope.seriesDateTimeHeading(
    start: Instant,
    startZoneOffset: ZoneOffset?,
    end: Instant,
    endZoneOffset: ZoneOffset?
) {
    item {
        SeriesDateTimeHeading(
            start = start,
            startZoneOffset = startZoneOffset,
            end = end,
            endZoneOffset = endZoneOffset
        )
    }
}

/**
 * Display DD/MM/YYYY and start and end date in text
 * @param start: Instant with the start date
 * @param startZoneOffset: ZoneOffset of the start date
 * @param end: Instant with the end date
 * @param endZoneOffset: ZoneOffset of the end date
 */
@Composable
fun SeriesDateTimeHeading(
    start: Instant,
    startZoneOffset: ZoneOffset?,
    end: Instant,
    endZoneOffset: ZoneOffset?
) {
    val textToDisplay = formatDateTime(
        start = start,
        startZoneOffset = startZoneOffset,
        end = end,
        endZoneOffset = endZoneOffset
    )
    Row(
        modifier = Modifier
            .fillMaxWidth(),
        horizontalArrangement = Arrangement.Center
    )
    {
        Text(
            color = MaterialTheme.colorScheme.secondary,
            text = textToDisplay,
            textAlign = TextAlign.Center
        )
    }
}
