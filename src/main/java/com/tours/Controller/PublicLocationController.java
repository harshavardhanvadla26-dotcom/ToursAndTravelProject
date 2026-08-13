package com.tours.Controller;

import com.tours.Entities.Location;
import com.tours.Service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/locations")
@CrossOrigin(origins = "*")
public class PublicLocationController {

    @Autowired
    private LocationService locationService;

    // Public, paginated and cacheable list of locations
    @GetMapping
    public ResponseEntity<List<Location>> list(
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<Integer> size
    ) {
        if (page.isPresent()) {
            int p = Math.max(0, page.get());
            int s = Math.max(1, size.orElse(20));
            Pageable pageable = PageRequest.of(p, s);
            Page<Location> result = locationService.getLocations(pageable);
            List<Location> body = result.getContent();
            return ResponseEntity.ok()
                    .cacheControl(CacheControl.maxAge(300, TimeUnit.SECONDS))
                    .body(body);
        }

        // return all locations (keep payload small in production by using paging)
        List<Location> all = locationService.getAllLocations();
        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(300, TimeUnit.SECONDS))
                .body(all);
    }
}
